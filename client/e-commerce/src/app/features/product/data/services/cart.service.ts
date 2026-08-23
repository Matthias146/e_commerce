import { Service, signal } from '@angular/core';
import { CartItem } from '../models/cartItem.interface';

@Service()
export class CartService {
  cartItems = signal<CartItem[]>([]);
  readonly totalPrice = signal(0);
  readonly totalQuantity = signal(0);

  addToCart(cartItem: CartItem): void {
    let alreadyExitsInCart = false;
    let exitingCartItem = undefined;

    if (this.cartItems().length > 0) {
      exitingCartItem = this.cartItems().find((tempCartItem) => tempCartItem.id === cartItem.id);
      alreadyExitsInCart = exitingCartItem !== undefined;
    }
    if (alreadyExitsInCart) {
      exitingCartItem!.quantity++;
    } else {
      this.cartItems.update((items) => [...items, cartItem]);
    }
    this.computeCartTotals();
  }

  computeCartTotals(): void {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for (const currentCartItem of this.cartItems()) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.set(totalPriceValue);
    this.totalQuantity.set(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number): void {
    console.log('Content of Cart');

    for (const tempCartItem of this.cartItems()) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(
        `name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, unitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`,
      );
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('-----');
  }
}
