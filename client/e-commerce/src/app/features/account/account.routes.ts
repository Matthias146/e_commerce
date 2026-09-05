import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';

export const accountRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuardFn],
    children: [
      {
        path: 'orders',
        loadComponent: () =>
          import('./orders/order-history/order-history').then((m) => m.OrderHistory),
      },
    ],
  },
];
