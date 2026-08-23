import { Component, inject } from '@angular/core';
import { ProductService } from '../data/services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { CartService } from '../data/services/cart.service';
import { CartItem } from '../data/models/cartItem.interface';

@Component({
  selector: 'app-product-detail',
  imports: [NgOptimizedImage, CurrencyPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);

  readonly product = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const productId = Number(params.get('id'));

        return this.productService.getProduct(productId);
      }),
    ),
  );

  addToCart(): void {
    const product = this.product();

    if (!product) {
      return;
    }
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      unitPrice: product.unitPrice,
      quantity: 1,
    };

    this.cartService.addToCart(cartItem);
  }
}
