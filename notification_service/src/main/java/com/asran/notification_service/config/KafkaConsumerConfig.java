package com.asran.notification_service.config;

import com.asran.notification_service.event.InventoryUpdatedEvent;
import com.asran.notification_service.event.UserRegisteredEvent;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;

import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;

import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableKafka
public class KafkaConsumerConfig {

    // ================= INVENTORY =================

    @Bean
    public ConsumerFactory<String, InventoryUpdatedEvent>
    consumerFactory() {

        JsonDeserializer<InventoryUpdatedEvent> deserializer =
                new JsonDeserializer<>(
                        InventoryUpdatedEvent.class
                );

        deserializer.addTrustedPackages("*");

        Map<String, Object> config =
                new HashMap<>();

        config.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                "kafka:9092"
        );

        config.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "notification-group"
        );

        config.put(
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
                StringDeserializer.class
        );

        config.put(
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
                JsonDeserializer.class
        );

        return new DefaultKafkaConsumerFactory<>(
                config,
                new StringDeserializer(),
                deserializer
        );
    }


    @Bean
    public ConcurrentKafkaListenerContainerFactory
            <String, InventoryUpdatedEvent>
    kafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory
                <String, InventoryUpdatedEvent> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(
                consumerFactory()
        );

        return factory;
    }


    // ================= USER =================

    @Bean
    public ConsumerFactory<String, UserRegisteredEvent>
    userConsumerFactory() {

        JsonDeserializer<UserRegisteredEvent> deserializer =
                new JsonDeserializer<>(
                        UserRegisteredEvent.class
                );

        deserializer.addTrustedPackages("*");
        deserializer.setUseTypeHeaders(false);

        Map<String, Object> config =
                new HashMap<>();

        config.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                "kafka:9092"
        );

        config.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "notification-group"
        );

        config.put(
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
                StringDeserializer.class
        );

        config.put(
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
                JsonDeserializer.class
        );

        return new DefaultKafkaConsumerFactory<>(
                config,
                new StringDeserializer(),
                deserializer
        );
    }


    @Bean
    public ConcurrentKafkaListenerContainerFactory
            <String, UserRegisteredEvent>
    userKafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory
                <String, UserRegisteredEvent> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(
                userConsumerFactory()
        );

        return factory;
    }
}