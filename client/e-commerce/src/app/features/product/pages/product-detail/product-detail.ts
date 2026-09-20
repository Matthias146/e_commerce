import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../data/services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { CartService } from '../../../cart/data/services/cart.service';
import { CartItem } from '../../../cart/data/models/cartItem.interface';

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
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly quantity = signal(1);

  readonly product = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const productId = Number(params.get('id'));

        this.isLoading.set(true);
        this.errorMessage.set(null);

        return this.productService.getProduct(productId).pipe(
          catchError(() => {
            this.errorMessage.set('Product could not be loaded. Please try again.');

            return of(undefined);
          }),
          finalize(() => this.isLoading.set(false)),
        );
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
      quantity: this.quantity(),
    };

    this.cartService.addToCart(cartItem);
  }

  increaseQuantity(): void {
    this.quantity.update((quantity) => quantity + 1);
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update((quantity) => quantity - 1);
    }
  }
}
