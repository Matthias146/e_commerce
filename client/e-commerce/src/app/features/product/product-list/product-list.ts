import {Component, inject} from '@angular/core';
import {ProductService} from '../product.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {CommonModule, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [
    CurrencyPipe, CommonModule
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private readonly productService = inject(ProductService);

  readonly productsResource = rxResource({
    defaultValue: [],
    stream: () => this.productService.getProductList()
  });

  readonly products = this.productsResource.value;
}
