import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Address } from '../../data/models/address.interface';

@Component({
  selector: 'app-billing-address-form',
  imports: [FormField],
  templateUrl: './billing-address-form.html',
  styleUrl: './billing-address-form.scss',
})
export class BillingAddressForm {
  billingAddressForm = input.required<FieldTree<Address>>();
}
