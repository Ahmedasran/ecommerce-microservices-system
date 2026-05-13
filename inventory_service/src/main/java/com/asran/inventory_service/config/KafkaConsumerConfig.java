package com.asran.inventory_service.config;

import com.asran.inventory_service.event.OrderPlacedEvent;
import com.asran.inventory_service.event.ProductCreatedEvent;
import com.asran.inventory_service.event.ProductDeletedEvent;
import com.asran.inventory_service.event.ProductUpdatedEvent;

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

    // ================= PRODUCT CREATED =================

    @Bean
    public ConsumerFactory<String, ProductCreatedEvent>
    productConsumerFactory() {

        Map<String, Object> props = new HashMap<>();

        props.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                "kafka:9092"
        );

        props.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "inventory-group"
        );

        props.put(
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,
                "earliest"
        );

        JsonDeserializer<ProductCreatedEvent> deserializer =
                new JsonDeserializer<>(
                        ProductCreatedEvent.class,
                        false
                );

        deserializer.addTrustedPackages("*");

        return new DefaultKafkaConsumerFactory<>(
                props,
                new StringDeserializer(),
                deserializer
        );
    }


    @Bean
    public ConcurrentKafkaListenerContainerFactory
            <String, ProductCreatedEvent>
    productKafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory
                <String, ProductCreatedEvent> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(
                productConsumerFactory()
        );

        return factory;
    }


    // ================= ORDER PLACED =================

    @Bean
    public ConsumerFactory<String, OrderPlacedEvent>
    orderConsumerFactory() {

        Map<String, Object> props = new HashMap<>();

        props.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                "kafka:9092"
        );

        props.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "inventory-group"
        );

        props.put(
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,
                "earliest"
        );

        JsonDeserializer<OrderPlacedEvent> deserializer =
                new JsonDeserializer<>(
                        OrderPlacedEvent.class,
                        false
                );

        deserializer.addTrustedPackages("*");

        return new DefaultKafkaConsumerFactory<>(
                props,
                new StringDeserializer(),
                deserializer
        );
    }


    @Bean
    public ConcurrentKafkaListenerContainerFactory
            <String, OrderPlacedEvent>
    orderKafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory
                <String, OrderPlacedEvent> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(
                orderConsumerFactory()
        );

        return factory;
    }


    // ================= PRODUCT DELETED =================

    @Bean
    public ConsumerFactory<String, ProductDeletedEvent>
    productDeleteConsumerFactory() {

        Map<String, Object> props = new HashMap<>();

        props.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                "kafka:9092"
        );

        props.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "inventory-group"
        );

        props.put(
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,
                "earliest"
        );

        JsonDeserializer<ProductDeletedEvent> deserializer =
                new JsonDeserializer<>(
                        ProductDeletedEvent.class,
                        false
                );

        deserializer.addTrustedPackages("*");

        return new DefaultKafkaConsumerFactory<>(
                props,
                new StringDeserializer(),
                deserializer
        );
    }


    @Bean
    public ConcurrentKafkaListenerContainerFactory
            <String, ProductDeletedEvent>
    productDeleteKafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory
                <String, ProductDeletedEvent> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(
                productDeleteConsumerFactory()
        );

        return factory;
    }


    // ================= PRODUCT UPDATED =================

    @Bean
    public ConsumerFactory<String, ProductUpdatedEvent>
    productUpdatedConsumerFactory() {

        Map<String, Object> props = new HashMap<>();

        props.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                "kafka:9092"
        );

        props.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "inventory-group"
        );

        props.put(
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,
                "earliest"
        );

        JsonDeserializer<ProductUpdatedEvent> deserializer =
                new JsonDeserializer<>(
                        ProductUpdatedEvent.class,
                        false
                );

        deserializer.addTrustedPackages("*");

        return new DefaultKafkaConsumerFactory<>(
                props,
                new StringDeserializer(),
                deserializer
        );
    }


    @Bean
    public ConcurrentKafkaListenerContainerFactory
            <String, ProductUpdatedEvent>
    productUpdatedKafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory
                <String, ProductUpdatedEvent> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(
                productUpdatedConsumerFactory()
        );

        return factory;
    }
}