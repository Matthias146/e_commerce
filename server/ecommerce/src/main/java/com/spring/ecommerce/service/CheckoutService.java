package com.spring.ecommerce.service;

import com.spring.ecommerce.dto.Purchase;
import com.spring.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
