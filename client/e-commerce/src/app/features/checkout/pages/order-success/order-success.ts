import { Component, inject, OnInit } from '@angular/core';
import { OrderSuccessState } from '../../data/models/orderSuccessState.interface';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-order-success',
  imports: [RouterLink, CurrencyPipe, NgOptimizedImage],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss',
})
export class OrderSuccess implements OnInit {
  private readonly router = inject(Router);
  readonly order = history.state as OrderSuccessState;

  ngOnInit(): void {
    if (!this.order?.orderTrackingNumber || !this.order?.orderedItems?.length) {
      void this.router.navigate(['/products']);
    }
  }
}
