package com.asran.product_service.controller;

import com.asran.product_service.dto.ProductRequest;
import com.asran.product_service.dto.ProductResponse;
import com.asran.product_service.service.ProductService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;


    // CREATE PRODUCT

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createProduct(
            @RequestBody ProductRequest productRequest
    ) {

        productService.createProduct(productRequest);

    }


    // GET ALL PRODUCTS

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProducts() {

        return productService.getAllProducts();

    }


    // DELETE PRODUCT

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProduct(
            @PathVariable String id
    ) {

        productService.deleteProduct(id);

    }


    // UPDATE PRODUCT

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateProduct(
            @PathVariable String id,
            @RequestBody ProductRequest productRequest
    ) {

        productService.updateProduct(id, productRequest);

    }

}