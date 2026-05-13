package com.asran.order_service.consumer;

import com.asran.order_service.event.InventoryUpdatedEvent;
import com.asran.order_service.model.Order;
import com.asran.order_service.repository.OrderRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderConsumer {

    private final OrderRepository orderRepository;

    @Transactional
    @KafkaListener(
            topics = "inventory-topic",
            groupId = "order-group"
    )
    public void consume(InventoryUpdatedEvent event){

        log.info("Inventory Response Received : {}", event);

        Order order = orderRepository
                .findById(event.getOrderId())
                .orElse(null);

        if(order == null){

            log.info("No Order Found");

            return;
        }

        if(event.getStatus().equals("UPDATED")){

            order.setStatus("APPROVED");

        } else {

            order.setStatus("FAILED");
        }

        orderRepository.save(order);

        log.info("Order Status Updated Successfully");
    }
}