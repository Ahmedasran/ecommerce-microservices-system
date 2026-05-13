package com.asran.inventory_service.service;

import com.asran.inventory_service.event.InventoryUpdatedEvent;
import com.asran.inventory_service.event.ProductStockStatusEvent;
import com.asran.inventory_service.model.Inventory;
import com.asran.inventory_service.producer.InventoryProducer;
import com.asran.inventory_service.repository.InventoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {

    private final InventoryProducer inventoryProducer;

    private final InventoryRepository inventoryRepository;


    @Transactional(readOnly = true)
    public boolean isInStock(String skuCode){

        return inventoryRepository.findBySkuCode(skuCode)
                .map(inventory -> inventory.getQuantity() > 0)
                .orElse(false);
    }


    @Transactional
    public void updateStock(
            Long orderId,
            String skuCode,
            Integer quantity,
            String email,
            String customerName
    ){

        Inventory inventory = inventoryRepository
                .findBySkuCode(skuCode)
                .orElseThrow(() ->
                        new RuntimeException("Product Not Found"));

        log.info("Old Quantity : {}", inventory.getQuantity());

        if(inventory.getQuantity() < quantity){
            throw new RuntimeException("Not Enough Stock");
        }

        // UPDATE QUANTITY

        inventory.setQuantity(
                inventory.getQuantity() - quantity
        );

        log.info("New Quantity : {}", inventory.getQuantity());

        inventoryRepository.save(inventory);

        log.info("Inventory Saved Successfully");

        InventoryUpdatedEvent inventoryEvent =
                new InventoryUpdatedEvent(
                        orderId,
                        skuCode,
                        quantity,
                        "CONFIRMED",
                        email,
                        customerName
                );

        inventoryProducer.sendInventoryEvent(
                inventoryEvent,
                "inventory-topic"
        );

        log.info("Inventory Notification Event Sent");


        // UPDATE STOCK STATUS

        String stockStatus =
                inventory.getQuantity() > 0
                        ? "IN_STOCK"
                        : "OUT_OF_STOCK";


        ProductStockStatusEvent event =
                new ProductStockStatusEvent(
                        inventory.getSkuCode(),
                        stockStatus
                );


        inventoryProducer.sendInventoryEvent(
                event,
                "product-stock-topic"
        );

        log.info("Product Stock Status Event Sent");
    }
}