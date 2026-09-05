import { required, SchemaPathTree } from '@angular/forms/signals';
import { CustomerFormModel } from '../data/models/customerFormModel.interface';

export const checkoutSchema = (path: SchemaPathTree<CustomerFormModel>): void => {
  required(path.contact.firstName, { message: 'First Name is required' });
  required(path.contact.lastName);
  required(path.contact.email);

  required(path.shippingAddress.street);
  required(path.shippingAddress.city);
  required(path.shippingAddress.state);
  required(path.shippingAddress.country);
  required(path.shippingAddress.zipCode);

  required(path.billingAddress.street);
  required(path.billingAddress.city);
  required(path.billingAddress.state);
  required(path.billingAddress.country);
  required(path.billingAddress.zipCode);
};
