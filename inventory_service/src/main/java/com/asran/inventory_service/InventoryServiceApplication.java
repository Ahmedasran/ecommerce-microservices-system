package com.asran.inventory_service;

import com.asran.inventory_service.model.Inventory;
import com.asran.inventory_service.repository.InventoryRepository;
import com.asran.inventory_service.service.InventoryService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class InventoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }


}
