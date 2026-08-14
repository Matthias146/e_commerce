import { Component, inject } from '@angular/core';
import { ProductService } from '../data/services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  readonly routeParams = toSignal(this.route.paramMap);

  readonly products = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const keyword = params.get('keyword');
        const categoryId = params.get('categoryId');

        if (keyword) {
          return this.productService.searchProducts(keyword);
        }

        if (categoryId) {
          return this.productService.getProductsByCategory(Number(categoryId));
        }

        return this.productService.getProductList();
      }),
    ),
    { initialValue: [] },
  );
}
