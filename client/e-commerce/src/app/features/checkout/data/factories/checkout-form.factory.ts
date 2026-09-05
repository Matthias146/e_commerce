import { Address } from '../models/address.interface';
import { ContactDetails } from '../models/contactDetails.interface';
import { CustomerFormModel } from '../models/customerFormModel.interface';

function createEmptyAddress(): Address {
  return {
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  };
}

function createEmptyContact(): ContactDetails {
  return {
    firstName: '',
    lastName: '',
    email: '',
  };
}

export function createEmptyCheckoutForm(): CustomerFormModel {
  return {
    contact: createEmptyContact(),
    shippingAddress: createEmptyAddress(),
    billingAddress: createEmptyAddress(),
    billingSameAsShipping: false,
  };
}
