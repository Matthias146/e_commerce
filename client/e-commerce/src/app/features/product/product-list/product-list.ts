import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';
import { ProductService } from '../data/services/product.service';
import { Product } from '../data/models/product.interface';
import { CartService } from '../data/services/cart.service';
import { CartItem } from '../data/models/cartItem.interface';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);

  pageNumber = signal(1);
  pageSize = signal(5);
  totalElements = 100;
  totalPages = 5;
  private readonly pageNumber$ = toObservable(this.pageNumber);
  private readonly pageSize$ = toObservable(this.pageSize);

  readonly products = toSignal(
    combineLatest([this.route.paramMap, this.pageNumber$, this.pageSize$]).pipe(
      switchMap(([params, pageNumber, pageSize]) => {
        const keyword = params.get('keyword');
        const categoryId = params.get('categoryId');

        if (keyword) {
          return this.productService.searchProductsPaginate(pageNumber - 1, pageSize, keyword).pipe(
            map((response) => {
              this.totalElements = response.page.totalElements;
              this.totalPages = response.page.totalPages;

              return response._embedded.products;
            }),
          );
        }

        if (categoryId) {
          return this.productService
            .getProductsByCategoryPaginate(pageNumber - 1, pageSize, Number(categoryId))
            .pipe(
              map((response) => {
                this.totalElements = response.page.totalElements;
                this.totalPages = response.page.totalPages;

                return response._embedded.products;
              }),
            );
        }

        return this.productService.getProductListPaginate(pageNumber - 1, pageSize).pipe(
          map((response) => {
            this.totalElements = response.page.totalElements;
            this.totalPages = response.page.totalPages;

            return response._embedded.products;
          }),
        );
      }),
    ),
    { initialValue: [] as Product[] },
  );
  previousPage(): void {
    if (this.pageNumber() > 1) {
      this.pageNumber.update((page) => page - 1);
    }
  }

  nextPage(): void {
    this.pageNumber.update((page) => page + 1);
  }
  updatePageSize(size: number): void {
    this.pageSize.set(size);
    this.pageNumber.set(1);
  }

  addToCart(product: Product): void {
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
