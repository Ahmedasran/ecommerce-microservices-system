package com.asran.order_service.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderPlacedEvent {

    private Long orderId;

    private String skuCode;

    private Integer quantity;

    private String email;

    private String customerName;
}