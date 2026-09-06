import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { form, FormRoot } from '@angular/forms/signals';
import { CustomerFormModel } from '../../data/models/customerFormModel.interface';
import { createEmptyCheckoutForm } from '../../data/factories/checkout-form.factory';
import { CurrencyPipe } from '@angular/common';
import { ContactForm } from '../../components/contact-form/contact-form';
import { ShippingAddressForm } from '../../components/shipping-address-form/shipping-address-form';
import { BillingAddressForm } from '../../components/billing-address-form/billing-address-form';
import { PaymentForm } from '../../components/payment-form/payment-form';
import { checkoutSchema } from '../../validators/checkout.schema';
import { CartService } from '../../../cart/data/services/cart.service';
import { CheckoutService } from '../../data/services/checkout.service';
import { Router } from '@angular/router';
import { Purchase } from '../../data/models/purchase.interface';
import { firstValueFrom } from 'rxjs';
import { OrderSuccessState } from '../../data/models/orderSuccessState.interface';

@Component({
  selector: 'app-checkout',
  imports: [
    FormRoot,
    CurrencyPipe,
    ContactForm,
    ShippingAddressForm,
    BillingAddressForm,
    PaymentForm,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private readonly cartService = inject(CartService);
  private readonly checkoutService = inject(CheckoutService);
  private readonly router = inject(Router);
  readonly paymentComponent = viewChild.required(PaymentForm);
  readonly totalPrice = this.cartService.totalPrice;
  readonly totalQuantity = this.cartService.totalQuantity;
  readonly cartItems = this.cartService.cartItems;
  readonly isSubmitting = signal(false);

  constructor() {
    effect(() => {
      const sameAsShipping = this.checkoutForm.billingSameAsShipping().value();

      if (!sameAsShipping) {
        return;
      }

      const shippingAddress = this.checkoutForm.shippingAddress().value();

      this.checkoutForm.billingAddress().value.set({
        ...shippingAddress,
      });
    });
  }
  checkoutModel = signal<CustomerFormModel>(createEmptyCheckoutForm());

  checkoutForm = form(this.checkoutModel, checkoutSchema, {
    submission: {
      action: async (field) => {
        this.isSubmitting.set(true);

        try {
          const paymentSuccessful = await this.paymentComponent().confirmPayment();

          if (!paymentSuccessful) {
            return;
          }

          const formValue = field().value();

          const orderItems = this.cartItems().map((item) => ({
            imageUrl: item.imageUrl,
            name: item.name,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            productId: Number(item.id),
          }));

          const purchase: Purchase = {
            customer: formValue.contact,
            shippingAddress: formValue.shippingAddress,
            billingAddress: formValue.billingAddress,
            order: {
              totalQuantity: this.totalQuantity(),
              totalPrice: this.totalPrice(),
            },
            orderItems,
          };

          const response = await firstValueFrom(this.checkoutService.placeOrder(purchase));

          const orderSuccessState: OrderSuccessState = {
            orderTrackingNumber: response.orderTrackingNumber,
            totalQuantity: this.totalQuantity(),
            totalPrice: this.totalPrice(),
            orderedItems: orderItems,
          };

          this.cartService.clearCart();
          this.checkoutModel.set(createEmptyCheckoutForm());

          await this.router.navigate(['/checkout/success'], {
            state: orderSuccessState,
          });
        } finally {
          this.isSubmitting.set(false);
        }
      },
    },
  });
}
