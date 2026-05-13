package com.asran.notification_service.consumer;

import com.asran.notification_service.event.UserRegisteredEvent;
import com.asran.notification_service.service.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserNotificationConsumer {

    private final EmailService emailService;

    @KafkaListener(
            topics = "user-topic",
            groupId = "notification-group",
            containerFactory =
                    "userKafkaListenerContainerFactory"
    )
    public void consume(UserRegisteredEvent event){

        log.info(
                "USER REGISTER EVENT RECEIVED : {}",
                event
        );

        emailService.sendWelcomeEmail(
                event.getEmail(),
                event.getName()
        );
    }
}