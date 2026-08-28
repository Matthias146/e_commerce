import { ContactDetails } from './contactDetails.interface';
import { CreditCard } from './creditCard.interface';
import { Address } from './address.interface';

export interface CustomerFormModel {
  contact: ContactDetails;
  shippingAddress: Address;
  billingAddress: Address;
  creditCard: CreditCard;
  billingSameAsShipping: boolean;
}
