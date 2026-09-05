package com.spring.ecommerce.dto;

public record PaymentInfo(
        long amount,
        String currency
) {}
