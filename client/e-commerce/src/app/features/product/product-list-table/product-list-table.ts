import {Component, inject} from '@angular/core';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {ProductService} from '../product.service';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list-table',
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
  ],
  templateUrl: './product-list-table.html',
  styleUrl: './product-list-table.scss',
})
export class ProductListTable {

  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  readonly categoryId = toSignal(this.route.paramMap);

  readonly productsResource = rxResource({
    defaultValue: [],
    stream: () => {
      const id = this.categoryId()?.get('id');

      return id
        ? this.productService.getProductsByCategory(Number(id))
        : this.productService.getProductList();
    }
  });

  readonly products = this.productsResource.value;
}

