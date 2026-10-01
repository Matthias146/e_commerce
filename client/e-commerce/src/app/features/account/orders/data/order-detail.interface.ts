export interface OrderDetail {
  orderTrackingNumber: string;
  totalQuantity: number;
  totalPrice: number;
  status: string | null;
  dateCreated: string;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  orderItems: OrderDetailItem[];
}

export interface OrderAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface OrderDetailItem {
  productId: number;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
}
