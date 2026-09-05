package com.spring.ecommerce.service;

import com.spring.ecommerce.dto.PaymentInfo;
import com.spring.ecommerce.dto.Purchase;
import com.spring.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
