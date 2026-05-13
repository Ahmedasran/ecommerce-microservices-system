package com.asran.product_service.service;

import com.asran.product_service.dto.ProductRequest;
import com.asran.product_service.dto.ProductResponse;

import com.asran.product_service.event.ProductCreatedEvent;
import com.asran.product_service.event.ProductDeletedEvent;
import com.asran.product_service.event.ProductUpdatedEvent;

import com.asran.product_service.model.Product;

import com.asran.product_service.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    private final KafkaTemplate<String, Object> kafkaTemplate;


    // CREATE PRODUCT

    public void createProduct(ProductRequest productRequest) {

        Product product = Product.builder()

                .name(productRequest.getName())

                .description(productRequest.getDescription())

                .price(productRequest.getPrice())

                .skuCode(productRequest.getSkuCode())

                .imageUrl(productRequest.getImageUrl())

                .build();

        productRepository.save(product);


        // SEND EVENT TO INVENTORY SERVICE

        ProductCreatedEvent event =
                new ProductCreatedEvent(
                        product.getSkuCode(),
                        productRequest.getQuantity()
                );

        kafkaTemplate.send(
                "product-created",
                event
        );

        log.info(
                "Product {} has been created",
                product.getId()
        );
    }


    // GET ALL PRODUCTS

    public List<ProductResponse> getAllProducts() {

        List<Product> products =
                productRepository.findAll();

        return products
                .stream()
                .map(this::mapToProductResponse)
                .toList();
    }


    // DELETE PRODUCT

    public void deleteProduct(String id) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product Not Found"
                        )
                );

        // DELETE FROM MONGO

        productRepository.delete(product);


        // SEND EVENT TO INVENTORY SERVICE

        ProductDeletedEvent event =
                new ProductDeletedEvent(
                        product.getSkuCode()
                );

        kafkaTemplate.send(
                "product-delete-topic",
                event
        );

        log.info(
                "Product {} has been deleted",
                product.getSkuCode()
        );
    }


    // UPDATE PRODUCT

    public void updateProduct(
            String id,
            ProductRequest productRequest
    ) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product Not Found"
                        )
                );


        // OLD SKU

        String oldSkuCode =
                product.getSkuCode();


        // UPDATE PRODUCT DATA

        product.setName(
                productRequest.getName()
        );

        product.setDescription(
                productRequest.getDescription()
        );

        product.setPrice(
                productRequest.getPrice()
        );

        product.setSkuCode(
                productRequest.getSkuCode()
        );

        product.setImageUrl(
                productRequest.getImageUrl()
        );


        // SAVE IN MONGODB

        productRepository.save(product);


        // SEND EVENT TO INVENTORY SERVICE

        ProductUpdatedEvent event =
                new ProductUpdatedEvent(
                        oldSkuCode,
                        productRequest.getSkuCode(),
                        productRequest.getQuantity()
                );

        kafkaTemplate.send(
                "product-update-topic",
                event
        );

        log.info(
                "Product {} has been updated",
                productRequest.getSkuCode()
        );
    }


    // MAP PRODUCT RESPONSE

    private ProductResponse mapToProductResponse(
            Product product
    ) {

        return ProductResponse.builder()

                .id(product.getId())

                .name(product.getName())

                .description(product.getDescription())

                .price(product.getPrice())

                .skuCode(product.getSkuCode())

                .imageUrl(product.getImageUrl())

                .stockStatus(
                        product.getStockStatus()
                )

                .build();
    }
}