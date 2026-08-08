import { Component, signal } from '@angular/core';
import {ProductListTable} from './features/product/product-list-table/product-list-table';


@Component({
  selector: 'app-root',
  imports: [
    ProductListTable
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('e-commerce');
}
