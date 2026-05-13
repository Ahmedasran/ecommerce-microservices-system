package com.asran.product_service.consumer;

import com.asran.product_service.event.ProductStockStatusEvent;
import com.asran.product_service.model.Product;
import com.asran.product_service.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductConsumer {

    private final ProductRepository productRepository;

    @KafkaListener(
            topics = "product-stock-topic",
            groupId = "product-group",
            containerFactory = "kafkaListenerContainerFactory"
    )
    public void consume(
            ProductStockStatusEvent event
    ){

        Product product = productRepository
                .findBySkuCode(event.getSkuCode())
                .orElse(null);

        if(product == null){
            return;
        }

        product.setStockStatus(
                event.getStockStatus()
        );

        productRepository.save(product);

        log.info(
                "Product {} changed to {}",
                product.getSkuCode(),
                event.getStockStatus()
        );
    }
}