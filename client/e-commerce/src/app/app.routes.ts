import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { ProductList } from './features/product/pages/product-list/product-list';
import { ProductDetail } from './features/product/pages/product-detail/product-detail';
import { CartDetail } from './features/cart/pages/cart-detail/cart-detail';
import { Checkout } from './features/checkout/pages/checkout/checkout';

export const routes: Routes = [
  {
    path: 'products',
    component: Layout,
    children: [
      { path: '', component: ProductList },
      { path: 'cart-details', component: CartDetail },
      { path: 'search/:keyword', component: ProductList },
      { path: 'checkout', component: Checkout },
      { path: 'category/:categoryId', component: ProductList },
      { path: ':id', component: ProductDetail },
    ],
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full',
  },
];
