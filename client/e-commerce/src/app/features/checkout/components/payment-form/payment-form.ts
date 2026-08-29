import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { CreditCard } from '../../data/models/creditCard.interface';

@Component({
  selector: 'app-payment-form',
  imports: [FormField],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {
  paymentForm = input.required<FieldTree<CreditCard>>();
}
