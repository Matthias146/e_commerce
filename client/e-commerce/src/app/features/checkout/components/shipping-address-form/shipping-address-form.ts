import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Address } from '../../data/models/address.interface';

@Component({
  selector: 'app-shipping-address-form',
  imports: [FormField],
  templateUrl: './shipping-address-form.html',
  styleUrl: './shipping-address-form.scss',
})
export class ShippingAddressForm {
  shippingForm = input.required<FieldTree<Address>>();
  billingSameAsShipping = input.required<FieldTree<boolean>>();
}
