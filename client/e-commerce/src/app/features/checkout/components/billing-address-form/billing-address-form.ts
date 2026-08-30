import { Component, inject, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Address } from '../../data/models/address.interface';
import { CheckoutService } from '../../data/services/checkout.service';

@Component({
  selector: 'app-billing-address-form',
  imports: [FormField],
  templateUrl: './billing-address-form.html',
  styleUrl: './billing-address-form.scss',
})
export class BillingAddressForm {
  billingAddressForm = input.required<FieldTree<Address>>();
  private readonly checkoutService = inject(CheckoutService);

  readonly countries = this.checkoutService.countries;
  readonly states = this.checkoutService.states;

  onCountryChange(countryCode: string): void {
    this.checkoutService.selectCountry(countryCode);
  }
}
