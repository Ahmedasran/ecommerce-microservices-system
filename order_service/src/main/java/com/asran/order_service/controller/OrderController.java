package com.asran.order_service.controller;

import com.asran.order_service.dto.OrderRequest;
import com.asran.order_service.model.Order;
import com.asran.order_service.service.OrderService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;


    // PLACE ORDER

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String placeOrder(@RequestBody OrderRequest orderRequest) {

        orderService.placeOrder(orderRequest);

        return "Order Placed Successfully";
    }


    // GET ALL ORDERS

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();
    }

}