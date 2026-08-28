import { computed, Service, signal } from '@angular/core';
import { CartItem } from '../models/cartItem.interface';

@Service()
export class CartService {
  private readonly cartItemsState = signal<CartItem[]>([]);

  readonly cartItems = this.cartItemsState.asReadonly();

  readonly hasItems = computed(() => this.cartItems().length > 0);

  readonly totalQuantity = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0),
  );

  readonly totalPrice = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity * item.unitPrice, 0),
  );

  addToCart(cartItem: CartItem): void {
    const existingItem = this.cartItems().some((item) => item.id === cartItem.id);

    if (existingItem) {
      this.cartItemsState.update((items) =>
        items.map((item) =>
          item.id === cartItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );
    } else {
      this.cartItemsState.update((items) => [...items, cartItem]);
    }
  }

  decreaseQuantity(cartItem: CartItem): void {
    this.cartItemsState.update((items) =>
      items
        .map((item) => (item.id === cartItem.id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  remove(item: CartItem): void {
    this.cartItemsState.update((items) => items.filter((i) => i.id !== item.id));
  }

  logCartData(): void {
    console.log('Content of Cart');

    for (const item of this.cartItems()) {
      const subtotalPrice = item.quantity * item.unitPrice;

      console.log(
        `name: ${item.name}, quantity: ${item.quantity}, unitPrice: ${item.unitPrice}, subtotalPrice: ${subtotalPrice}`,
      );
    }

    console.log(
      `totalPrice: ${this.totalPrice().toFixed(2)}, totalQuantity: ${this.totalQuantity()}`,
    );

    console.log('-----');
  }
}
