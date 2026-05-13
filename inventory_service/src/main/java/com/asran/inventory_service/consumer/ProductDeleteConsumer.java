package com.asran.inventory_service.consumer;

import com.asran.inventory_service.event.ProductDeletedEvent;
import com.asran.inventory_service.model.Inventory;
import com.asran.inventory_service.repository.InventoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductDeleteConsumer {

    private final InventoryRepository inventoryRepository;

    @KafkaListener(
            topics = "product-delete-topic",
            groupId = "inventory-group",
             containerFactory =
            "productDeleteKafkaListenerContainerFactory"
    )
    public void consume(ProductDeletedEvent event){

        Inventory inventory = inventoryRepository
                .findBySkuCode(event.getSkuCode())
                .orElse(null);

        if(inventory == null){

            log.info("Inventory Not Found");

            return;
        }

        inventoryRepository.delete(inventory);

        log.info(
                "Inventory Deleted For Product {}",
                event.getSkuCode()
        );
    }
}