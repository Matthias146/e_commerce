import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderHistoryService } from '../data/order-history.service';
import { of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.scss',
})
export class OrderDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly orderHistoryService = inject(OrderHistoryService);

  readonly order = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const orderTrackingNumber = params.get('orderTrackingNumber');

        if (!orderTrackingNumber) {
          return of(undefined);
        }

        return this.orderHistoryService.getOrder(orderTrackingNumber);
      }),
    ),
  );
}
