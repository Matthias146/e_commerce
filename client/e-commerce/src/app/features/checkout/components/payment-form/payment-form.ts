import { Component, inject, OnInit, signal } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { environment } from '../../../../../environments/environment';
import { CheckoutService } from '../../data/services/checkout.service';
import { CartService } from '../../../cart/data/services/cart.service';
import { firstValueFrom } from 'rxjs';
import { PaymentInfo } from '../../data/models/creditCard.interface';

@Component({
  selector: 'app-payment-form',
  imports: [],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm implements OnInit {
  private readonly checkoutService = inject(CheckoutService);
  private readonly cartService = inject(CartService);
  readonly totalPrice = this.cartService.totalPrice;
  readonly paymentError = signal<string | null>(null);
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  readonly stripePromise = loadStripe(environment.stripe.stripePublishKey);

  ngOnInit(): void {
    this.createPaymentIntent();
  }

  async createPaymentIntent(): Promise<void> {
    const paymentInfo: PaymentInfo = {
      amount: Math.round(this.totalPrice() * 100),
      currency: 'eur',
    };

    const response = await firstValueFrom(this.checkoutService.createPaymentIntent(paymentInfo));

    const stripe = await this.stripePromise;

    if (!stripe) {
      return;
    }

    this.elements = stripe.elements({
      clientSecret: response.clientSecret,
    });
    const paymentElement = this.elements.create('payment');

    paymentElement.mount('#payment-element');
  }

  async confirmPayment(): Promise<boolean> {
    const stripe = await this.stripePromise;

    if (!stripe || !this.elements) {
      return false;
    }

    const { error } = await stripe.confirmPayment({
      elements: this.elements,
      redirect: 'if_required',
    });

    if (error) {
      this.paymentError.set(error.message ?? 'Payment failed.');

      return false;
    }

    this.paymentError.set(null);

    return true;
  }
}
