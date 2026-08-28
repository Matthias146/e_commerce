import { Component, effect, signal } from '@angular/core';
import { form, FormField, FormRoot, required, validate } from '@angular/forms/signals';
import { CustomerFormModel } from '../../data/models/customerFormModel.interface';
import { createEmptyCheckoutForm } from '../../data/factories/checkout-form.factory';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [FormRoot, FormField, CurrencyPipe],
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

  checkoutForm = form(
    this.checkoutModel,
    (schemaPath) => {
      required(schemaPath.contact.firstName);
      required(schemaPath.contact.lastName);
      required(schemaPath.contact.email);
      validate(schemaPath.creditCard.expirationDate, ({ value }) => {
        const expirationDate = value();

        if (!expirationDate) {
          return undefined;
        }

        const now = new Date();

        const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

        return expirationDate < currentMonth
          ? {
              kind: 'expired',
              message: 'The credit card has expired.',
            }
          : undefined;
      });
    },
    {
      submission: {
        action: async (field) => {
          console.log(field().value());
        },
      },
    },
  );
}
