package com.spring.ecommerce.dto;

import com.spring.ecommerce.entity.Address;
import com.spring.ecommerce.entity.Customer;
import com.spring.ecommerce.entity.Order;
import com.spring.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
