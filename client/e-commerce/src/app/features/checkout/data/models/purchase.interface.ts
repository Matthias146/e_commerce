import { ContactDetails } from './contactDetails.interface';
import { Address } from './address.interface';
import { Order } from './order.interface';
import { OrderItem } from './orderItem.interface';

export interface Purchase {
  customer: ContactDetails;
  shippingAddress: Address;
  billingAddress: Address;
  order: Order;
  orderItems: OrderItem[];
}
