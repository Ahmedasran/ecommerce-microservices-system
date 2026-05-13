package com.asran.inventory_service.consumer;

import com.asran.inventory_service.event.ProductCreatedEvent;
import com.asran.inventory_service.event.ProductStockStatusEvent;
import com.asran.inventory_service.model.Inventory;
import com.asran.inventory_service.repository.InventoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ProductConsumer {

    private final InventoryRepository inventoryRepository;

    private final KafkaTemplate<String, Object> kafkaTemplate;


    @KafkaListener(
            topics = "product-created",
            groupId = "inventory-group",
            containerFactory = "productKafkaListenerContainerFactory"
    )
    public void consume(ProductCreatedEvent event) {

        Inventory inventory = Inventory.builder()
                .skuCode(event.getSkuCode())
                .quantity(event.getQuantity())
                .build();

        inventoryRepository.save(inventory);


        String stockStatus =
                event.getQuantity() > 0
                        ? "IN_STOCK"
                        : "OUT_OF_STOCK";


        ProductStockStatusEvent stockStatusEvent =
                new ProductStockStatusEvent(
                        event.getSkuCode(),
                        stockStatus
                );


        kafkaTemplate.send(
                "product-stock-topic",
                stockStatusEvent
        );

        log.info(
                "Inventory Created Successfully For Product {}",
                event.getSkuCode()
        );
    }
}