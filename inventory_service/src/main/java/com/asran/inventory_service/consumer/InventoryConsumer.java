package com.asran.inventory_service.consumer;

import com.asran.inventory_service.event.InventoryUpdatedEvent;
import com.asran.inventory_service.event.OrderPlacedEvent;
import com.asran.inventory_service.producer.InventoryProducer;
import com.asran.inventory_service.service.InventoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class InventoryConsumer {

    private final InventoryService inventoryService;
    private final InventoryProducer inventoryProducer;

    @KafkaListener(
            topics = "order-topic",
            groupId = "inventory-group",
            containerFactory = "orderKafkaListenerContainerFactory"
    )
    public void consume(OrderPlacedEvent event){

        log.info("Received Order Event : {}", event);

        try {

            inventoryService.updateStock(
                    event.getOrderId(),
                    event.getSkuCode(),
                    event.getQuantity(),
                    event.getEmail(),
                    event.getCustomerName()
            );

            InventoryUpdatedEvent updatedEvent =
                    new InventoryUpdatedEvent(
                            event.getOrderId(),
                            event.getSkuCode(),
                            event.getQuantity(),
                            "UPDATED",
                            event.getEmail(),
                            event.getCustomerName()
                    );

            inventoryProducer.sendInventoryEvent(
                    updatedEvent,
                    "inventory-topic"
            );

            log.info("Inventory Updated Successfully");

        } catch (Exception e){

            log.error("Error While Updating Inventory", e);

            InventoryUpdatedEvent failedEvent =
                    new InventoryUpdatedEvent(
                            event.getOrderId(),
                            event.getSkuCode(),
                            event.getQuantity(),
                            "FAILED",
                            event.getEmail(),
                            event.getCustomerName()
                    );

            inventoryProducer.sendInventoryEvent(
                    failedEvent,
                    "inventory-topic"
            );
        }
    }
}