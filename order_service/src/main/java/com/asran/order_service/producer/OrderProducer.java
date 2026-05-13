package com.asran.order_service.producer;

import com.asran.order_service.event.OrderPlacedEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderProducer {

    private final KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate;

    public OrderProducer(KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendOrderEvent(OrderPlacedEvent event) {

        kafkaTemplate.send(
                "order-topic",
                event
        );

        System.out.println("Order Event Sent: " + event);

    }
}