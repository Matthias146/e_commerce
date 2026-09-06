import { Component, inject } from '@angular/core';
import { CartService } from '../../../cart/data/services/cart.service';
import { RouterLink } from '@angular/router';
import { LucideShoppingCart } from '@lucide/angular';

@Component({
  selector: 'app-card-status',
  imports: [RouterLink, LucideShoppingCart],
  templateUrl: './card-status.html',
  styleUrl: './card-status.scss',
})
export class CardStatus {
  private readonly cartService = inject(CartService);
  readonly totalPrice = this.cartService.totalPrice;
  readonly totalQuantity = this.cartService.totalQuantity;
}
