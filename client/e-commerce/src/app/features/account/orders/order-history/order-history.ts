import { Component, inject, signal } from '@angular/core';
import { OrderHistoryService } from '../data/order-history.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-history',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './order-history.html',
  styleUrl: './order-history.scss',
})
export class OrderHistory {
  private readonly orderHistoryService = inject(OrderHistoryService);
  private readonly authService = inject(AuthService);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly orderHistory = toSignal(
    this.authService.user$.pipe(
      switchMap((user) => {
        const email = user?.email;

        if (!email) {
          return of({ _embedded: { orders: [] } });
        }

        this.isLoading.set(true);
        this.errorMessage.set(null);

        return this.orderHistoryService.getOrderHistory(email).pipe(
          catchError(() => {
            this.errorMessage.set('Orders could not be loaded. Please try again.');

            return of({ _embedded: { orders: [] } });
          }),
          finalize(() => this.isLoading.set(false)),
        );
      }),
    ),
  );
}
