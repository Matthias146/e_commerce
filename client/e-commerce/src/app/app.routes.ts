import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { ProductList } from './features/product/product-list/product-list';

export const routes: Routes = [
  {
    path: 'products',
    component: Layout,
    children: [
      { path: 'search/:keyword', component: ProductList },
      { path: 'category/:id', component: ProductList },
      { path: 'category', component: ProductList },
      { path: 'products', component: ProductList },
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
