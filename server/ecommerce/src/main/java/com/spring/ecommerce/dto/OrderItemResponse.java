package com.spring.ecommerce.dto;

import java.math.BigDecimal;

public record OrderItemResponse(Long productId,
                                String name,
                                String imageUrl,
                                BigDecimal unitPrice,
                                int quantity) {
}
