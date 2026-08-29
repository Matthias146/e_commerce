import { Component, effect, signal } from '@angular/core';
import { form, FormRoot } from '@angular/forms/signals';
import { CustomerFormModel } from '../../data/models/customerFormModel.interface';
import { createEmptyCheckoutForm } from '../../data/factories/checkout-form.factory';
import { CurrencyPipe } from '@angular/common';
import { ContactForm } from '../../components/contact-form/contact-form';
import { ShippingAddressForm } from '../../components/shipping-address-form/shipping-address-form';
import { BillingAddressForm } from '../../components/billing-address-form/billing-address-form';
import { PaymentForm } from '../../components/payment-form/payment-form';
import { checkoutSchema } from '../../validators/checkout.schema';

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
  totalPrice = signal(0);
  totalQuantity = signal(0);

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
        console.log(field().value());
      },
    },
  });
}
