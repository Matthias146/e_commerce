package com.spring.ecommerce.controller;

import com.spring.ecommerce.dao.OrderRepository;
import com.spring.ecommerce.dto.AddressResponse;
import com.spring.ecommerce.dto.OrderDetailResponse;
import com.spring.ecommerce.dto.OrderItemResponse;
import com.spring.ecommerce.entity.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/order-details")
public class OrderDetailController {

    private final OrderRepository orderRepository;

    public OrderDetailController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/{orderTrackingNumber}")
    public ResponseEntity<OrderDetailResponse> getOrderDetail(
            @PathVariable String orderTrackingNumber
    ) {
        return orderRepository
                .findByOrderTrackingNumber(orderTrackingNumber)
                .map(this::toResponse)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private OrderDetailResponse toResponse(Order order) {
        var shippingAddress = new AddressResponse(
                order.getShippingAddress().getStreet(),
                order.getShippingAddress().getCity(),
                order.getShippingAddress().getState(),
                order.getShippingAddress().getCountry(),
                order.getShippingAddress().getZipCode()
        );

        var billingAddress = new AddressResponse(
                order.getBillingAddress().getStreet(),
                order.getBillingAddress().getCity(),
                order.getBillingAddress().getState(),
                order.getBillingAddress().getCountry(),
                order.getBillingAddress().getZipCode()
        );

        Set<OrderItemResponse> orderItems = order.getOrderItems()
                .stream()
                .map(item -> new OrderItemResponse(
                        item.getProductId(),
                        item.getName(),
                        item.getImageUrl(),
                        item.getUnitPrice(),
                        item.getQuantity()
                ))
                .collect(Collectors.toSet());

        return new OrderDetailResponse(
                order.getOrderTrackingNumber(),
                order.getTotalQuantity(),
                order.getTotalPrice(),
                order.getStatus(),
                order.getDateCreated(),
                shippingAddress,
                billingAddress,
                orderItems
        );
    }
}
