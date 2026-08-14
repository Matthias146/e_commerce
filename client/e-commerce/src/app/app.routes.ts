import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { ProductList } from './features/product/product-list/product-list';
import { ProductDetail } from './features/product/product-detail/product-detail';

export const routes: Routes = [
  {
    path: 'products',
    component: Layout,
    children: [
      { path: '', component: ProductList },
      { path: 'search/:keyword', component: ProductList },
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
