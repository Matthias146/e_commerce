export interface PaymentInfo {
  amount: number;
  currency: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
}
