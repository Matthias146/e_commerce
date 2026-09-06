import { email, required, SchemaPathTree } from '@angular/forms/signals';
import { CustomerFormModel } from '../data/models/customerFormModel.interface';

export const checkoutSchema = (path: SchemaPathTree<CustomerFormModel>): void => {
  required(path.contact.firstName, { message: 'First Name is required' });
  required(path.contact.lastName, { message: 'Last Name is required' });
  required(path.contact.email, { message: 'Email Name is required' });
  email(path.contact.email, { message: 'Enter a valid email address' });
  required(path.shippingAddress.street, { message: 'First Name is required' });
  required(path.shippingAddress.city, { message: 'First Name is required' });
  required(path.shippingAddress.state, { message: 'First Name is required' });
  required(path.shippingAddress.country, { message: 'First Name is required' });
  required(path.shippingAddress.zipCode, { message: 'First Name is required' });

  required(path.billingAddress.street, { message: 'First Name is required' });
  required(path.billingAddress.city, { message: 'First Name is required' });
  required(path.billingAddress.state, { message: 'First Name is required' });
  required(path.billingAddress.country, { message: 'First Name is required' });
  required(path.billingAddress.zipCode, { message: 'First Name is required' });
};
