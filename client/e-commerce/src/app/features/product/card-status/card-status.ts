import { Component, inject } from '@angular/core';
import { CartService } from '../data/services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-status',
  imports: [CurrencyPipe],
  templateUrl: './card-status.html',
  styleUrl: './card-status.scss',
})
export class CardStatus {
  private readonly cartService = inject(CartService);
  readonly totalPrice = this.cartService.totalPrice;
  readonly totalQuantity = this.cartService.totalQuantity;
}
