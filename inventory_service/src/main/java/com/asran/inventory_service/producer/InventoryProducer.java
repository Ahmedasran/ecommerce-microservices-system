package com.asran.inventory_service.producer;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InventoryProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendInventoryEvent(Object event, String topic){

        kafkaTemplate.send(
                topic,
                event
        );

        System.out.println("Event Sent");
    }
}