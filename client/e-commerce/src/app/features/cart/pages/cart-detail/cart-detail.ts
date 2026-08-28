import { Component, inject } from '@angular/core';
import { CartService } from '../../data/services/cart.service';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../data/models/cartItem.interface';

@Component({
  selector: 'app-cart-detail',
  imports: [NgOptimizedImage, CurrencyPipe, RouterLink],
  templateUrl: './cart-detail.html',
  styleUrl: './cart-detail.scss',
})
export class CartDetail {
  private readonly cartService = inject(CartService);
  readonly cartItems = this.cartService.cartItems;
  readonly totalPrice = this.cartService.totalPrice;
  readonly totalQuantity = this.cartService.totalQuantity;
  readonly hasItems = this.cartService.hasItems;

  increaseQuantity(cartItem: CartItem): void {
    this.cartService.addToCart(cartItem);
  }

  protected decreaseQuantity(cartItem: CartItem): void {
    this.cartService.decreaseQuantity(cartItem);
  }

  removeItem(item: CartItem): void {
    this.cartService.remove(item);
  }
}
