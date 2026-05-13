package com.asran.order_service.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryUpdatedEvent {
    private Long orderId;
    private String skuCode;
    private Integer quantity;
    private String status;
}