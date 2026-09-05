package com.spring.ecommerce.controller;

import com.spring.ecommerce.dto.PaymentInfo;
import com.spring.ecommerce.dto.PaymentIntentResponse;
import com.spring.ecommerce.dto.Purchase;
import com.spring.ecommerce.dto.PurchaseResponse;
import com.spring.ecommerce.service.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        return checkoutService.placeOrder(purchase);
    }

    @PostMapping("/purchase/intent")
    public ResponseEntity<PaymentIntentResponse> createPaymentIntent(
            @RequestBody PaymentInfo paymentInfo
    ) throws StripeException {

        PaymentIntent paymentIntent =
                checkoutService.createPaymentIntent(paymentInfo);

        PaymentIntentResponse response =
                new PaymentIntentResponse(paymentIntent.getClientSecret());

        return ResponseEntity.ok(response);
    }
}