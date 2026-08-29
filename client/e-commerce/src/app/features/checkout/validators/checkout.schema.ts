import { required, SchemaPathTree, validate } from '@angular/forms/signals';
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

  required(path.creditCard.cardType);
  required(path.creditCard.nameOnCard);
  required(path.creditCard.cardNumber);
  required(path.creditCard.expirationDate);
  required(path.creditCard.cvv);
  validate(path.creditCard.expirationDate, ({ value }) => {
    const expirationDate = value();

    if (!expirationDate) {
      return undefined;
    }

    const now = new Date();

    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    return expirationDate < currentMonth
      ? {
          kind: 'expired',
          message: 'The credit card has expired.',
        }
      : undefined;
  });
};
