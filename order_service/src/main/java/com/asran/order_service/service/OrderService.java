package com.asran.order_service.service;

import com.asran.order_service.dto.OrderLineItemsDto;
import com.asran.order_service.dto.OrderRequest;
import com.asran.order_service.event.OrderPlacedEvent;
import com.asran.order_service.model.Order;
import com.asran.order_service.model.OrderLineItems;
import com.asran.order_service.producer.OrderProducer;
import com.asran.order_service.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderProducer orderProducer;


    // PLACE ORDER

    public void placeOrder(OrderRequest orderRequest) {

        System.out.println("STEP 1");

        Order order = new Order();

        order.setOrderNumber(UUID.randomUUID().toString());

        // DEFAULT STATUS
        order.setStatus("PENDING");

        List<OrderLineItems> orderLineItems = orderRequest
                .getOrderLineItemsDtoList()
                .stream()
                .map(this::mapToDto)
                .toList();

        System.out.println("STEP 2");

        order.setOrderLineItemsList(orderLineItems);

        // IMPORTANT
        Order savedOrder = orderRepository.save(order);

        System.out.println("STEP 3");

        for (OrderLineItems item : orderLineItems) {

            System.out.println("STEP 4");

            OrderPlacedEvent event =
                    new OrderPlacedEvent(
                            savedOrder.getId(),
                            item.getSkuCode(),
                            item.getQuantity(),
                            orderRequest.getEmail(),
                            orderRequest.getCustomerName()
                    );

            System.out.println("STEP 5");

            orderProducer.sendOrderEvent(event);

            System.out.println("STEP 6");

        }

    }


    // GET ALL ORDERS

    public List<Order> getAllOrders() {

        return orderRepository.findAll();

    }


    // MAP DTO

    private OrderLineItems mapToDto(OrderLineItemsDto orderLineItemsDto) {

        OrderLineItems orderLineItems = new OrderLineItems();

        orderLineItems.setPrice(orderLineItemsDto.getPrice());

        orderLineItems.setQuantity(orderLineItemsDto.getQuantity());

        orderLineItems.setSkuCode(orderLineItemsDto.getSkuCode());

        return orderLineItems;
    }
}