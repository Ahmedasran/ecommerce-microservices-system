package com.asran.user_service.producer;

import com.asran.user_service.event.UserRegisteredEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProducer {

    private final KafkaTemplate<String, UserRegisteredEvent> kafkaTemplate;

    public void sendEvent(UserRegisteredEvent event){

        kafkaTemplate.send("user-topic", event);

        System.out.println("USER EVENT SENT : " + event);
    }
}