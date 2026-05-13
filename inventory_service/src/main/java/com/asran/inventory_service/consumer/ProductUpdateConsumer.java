package com.asran.inventory_service.consumer;

import com.asran.inventory_service.event.ProductStockStatusEvent;
import com.asran.inventory_service.event.ProductUpdatedEvent;
import com.asran.inventory_service.model.Inventory;
import com.asran.inventory_service.producer.InventoryProducer;
import com.asran.inventory_service.repository.InventoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductUpdateConsumer {

    private final InventoryRepository inventoryRepository;

    private final InventoryProducer inventoryProducer;

    @KafkaListener(
            topics = "product-update-topic",
            groupId = "inventory-group",
            containerFactory =
                    "productUpdatedKafkaListenerContainerFactory"
    )
    public void consume(ProductUpdatedEvent event){

        log.info(
                "Received Product Update Event : {}",
                event
        );

        Inventory inventory = inventoryRepository
                .findBySkuCode(event.getOldSkuCode())
                .orElse(null);

        if(inventory == null){

            log.info("Inventory Not Found");

            return;
        }

        // UPDATE SKU

        inventory.setSkuCode(
                event.getNewSkuCode()
        );

        // UPDATE QUANTITY

        inventory.setQuantity(
                event.getQuantity()
        );

        inventoryRepository.save(inventory);

        // UPDATE STOCK STATUS

        String stockStatus =
                inventory.getQuantity() > 0
                        ? "IN_STOCK"
                        : "OUT_OF_STOCK";

        ProductStockStatusEvent stockEvent =
                new ProductStockStatusEvent(
                        inventory.getSkuCode(),
                        stockStatus
                );

        inventoryProducer.sendInventoryEvent(
                stockEvent,
                "product-stock-topic"
        );

        log.info(
                "Product Stock Status Updated : {}",
                stockStatus
        );

        log.info(
                "Inventory Updated Successfully"
        );
    }
}