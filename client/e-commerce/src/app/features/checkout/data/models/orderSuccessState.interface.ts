import { OrderItem } from './orderItem.interface';

export interface OrderSuccessState {
  orderTrackingNumber: string;
  totalQuantity: number;
  totalPrice: number;
  orderedItems: OrderItem[];
}
