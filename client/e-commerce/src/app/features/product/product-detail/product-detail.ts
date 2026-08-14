import { Component, inject } from '@angular/core';
import { ProductService } from '../data/services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [NgOptimizedImage, CurrencyPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  readonly product = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const productId = Number(params.get('id'));

        return this.productService.getProduct(productId);
      }),
    ),
  );
  protected readonly ProductService = ProductService;
}
