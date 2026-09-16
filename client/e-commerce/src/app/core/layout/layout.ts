import { Component, inject } from '@angular/core';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';
import { CartService } from '../../features/cart/data/services/cart.service';

@Component({
  selector: 'app-layout',
  imports: [Header, Sidebar, Footer, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  private readonly cartService = inject(CartService);

  readonly cartMessage = this.cartService.cartMessage;
}
