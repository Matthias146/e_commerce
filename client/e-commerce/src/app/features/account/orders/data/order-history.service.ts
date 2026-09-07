import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetResponseOrderHistory } from './order-history.interface';

@Service()
export class OrderHistoryService {
  private readonly orderUrl = 'http://localhost:8080/api/orders';
  private readonly http = inject(HttpClient);

  getOrderHistory(email: string): Observable<GetResponseOrderHistory> {
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${email}`;
    return this.http.get<GetResponseOrderHistory>(orderHistoryUrl);
  }
}
