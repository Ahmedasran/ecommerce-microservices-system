package com.asran.notification_service.consumer;

import com.asran.notification_service.event.InventoryUpdatedEvent;
import com.asran.notification_service.service.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationConsumer {

    private final EmailService emailService;

    @KafkaListener(
            topics = "inventory-topic",
            groupId = "notification-group"
    )
    public void consume(InventoryUpdatedEvent event){

        log.info(
                "NOTIFICATION RECEIVED : {}",
                event
        );

        if("CONFIRMED".equals(event.getStatus())){

            emailService.sendOrderConfirmedEmail(
                    event.getEmail(),
                    event.getCustomerName(),
                    event.getOrderId(),
                    event.getSkuCode()
            );
        }
    }
}