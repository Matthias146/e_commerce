import { ContactDetails } from './contactDetails.interface';
import { Address } from './address.interface';

export interface CustomerFormModel {
  contact: ContactDetails;
  shippingAddress: Address;
  billingAddress: Address;
  billingSameAsShipping: boolean;
}
