import { Component, signal } from '@angular/core';
import {ProductList} from './features/product/product-list/product-list';


@Component({
  selector: 'app-root',
  imports: [
    ProductList
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('e-commerce');
}
