import {Component, inject} from '@angular/core';
import {ProductService} from '../product.service';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

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
  private readonly route = inject(ActivatedRoute);

  readonly categoryId = toSignal(this.route.paramMap);


  readonly productsResource = rxResource({
    defaultValue: [],
    stream: () => {
      const id = this.categoryId()?.get('id');

      if (id) {
        return this.productService.getProductsByCategory(Number(id));
      }

      return this.productService.getProductList();
    }
  });

  readonly products = this.productsResource.value;
}
