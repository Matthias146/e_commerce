import { Component, inject, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Address } from '../../data/models/address.interface';
import { CheckoutService } from '../../data/services/checkout.service';

@Component({
  selector: 'app-shipping-address-form',
  imports: [FormField],
  templateUrl: './shipping-address-form.html',
  styleUrl: './shipping-address-form.scss',
})
export class ShippingAddressForm {
  shippingForm = input.required<FieldTree<Address>>();
  billingSameAsShipping = input.required<FieldTree<boolean>>();
  private readonly checkoutService = inject(CheckoutService);

  readonly countries = this.checkoutService.countries;
  readonly states = this.checkoutService.states;

  onCountryChange(countryCode: string): void {
    this.checkoutService.selectCountry(countryCode);
  }
}
