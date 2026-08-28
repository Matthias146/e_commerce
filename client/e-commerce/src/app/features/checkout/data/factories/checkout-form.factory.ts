import { Address } from '../models/address.interface';
import { ContactDetails } from '../models/contactDetails.interface';
import { CreditCard } from '../models/creditCard.interface';
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

function createEmptyCreditCard(): CreditCard {
  return {
    cardType: '',
    nameOnCard: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  };
}

export function createEmptyCheckoutForm(): CustomerFormModel {
  return {
    contact: createEmptyContact(),
    shippingAddress: createEmptyAddress(),
    billingAddress: createEmptyAddress(),
    creditCard: createEmptyCreditCard(),
    billingSameAsShipping: false,
  };
}
