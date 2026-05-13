package com.asran.inventory_service.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductStockStatusEvent {

    private String skuCode;

    private String stockStatus;
}