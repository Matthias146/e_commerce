export interface OrderHistory {
  id: string;
  orderTrackingNumber: string;
  totalPrice: number;
  totalQuantity: number;
  dateCreated: Date;
}

export interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[];
  };
}
