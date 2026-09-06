import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { ProductList } from './features/product/pages/product-list/product-list';
import { ProductDetail } from './features/product/pages/product-detail/product-detail';
import { CartDetail } from './features/cart/pages/cart-detail/cart-detail';
import { Checkout } from './features/checkout/pages/checkout/checkout';
import { OrderSuccess } from './features/checkout/pages/order-success/order-success';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'products',
        children: [
          { path: '', component: ProductList },
          { path: 'search/:keyword', component: ProductList },
          { path: 'category/:categoryId', component: ProductList },
          { path: ':id', component: ProductDetail },
        ],
      },

      { path: 'cart-details', component: CartDetail },
      { path: 'checkout', component: Checkout },
      { path: 'checkout/success', component: OrderSuccess },
      {
        path: 'account',
        loadChildren: () =>
          import('./features/account/account.routes').then((m) => m.accountRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full',
  },
];
