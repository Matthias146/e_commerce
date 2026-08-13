import { Component, inject } from '@angular/core';
import { ProductService } from '../data/services/product.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, CommonModule, NgOptimizedImage],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  readonly routeParams = toSignal(this.route.paramMap);

  readonly productsResource = rxResource({
    params: () => ({
      id: this.routeParams()?.get('id'),
      keyword: this.routeParams()?.get('keyword'),
    }),
    defaultValue: [],
    stream: ({ params }) => {
      if (params.keyword) {
        return this.productService.searchProducts(params.keyword);
      }
      if (params.id) {
        return this.productService.getProductsByCategory(Number(params.id));
      }

      return this.productService.getProductList();
    },
  });

  readonly products = this.productsResource.value;
}
