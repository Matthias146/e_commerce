package com.spring.ecommerce.dto;

import com.spring.ecommerce.entity.Address;
import com.spring.ecommerce.entity.OrderItem;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

public record OrderDetailResponse(  String orderTrackingNumber,
                                    int totalQuantity,
                                    BigDecimal totalPrice,
                                    String status,
                                    LocalDateTime dateCreated,
                                    AddressResponse shippingAddress,
                                    AddressResponse billingAddress,
                                    Set<OrderItemResponse> orderItems) {
}
