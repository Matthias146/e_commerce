import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable, tap } from 'rxjs';
import {
  GetResponseProducts,
  GetResponseProductsCategory,
  Product,
  SortOption,
} from '../models/product.interface';
import { ProductCategory } from '../../pages/product-category/product-category';
import { toSignal } from '@angular/core/rxjs-interop';

@Service()
export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/api/products';
  private readonly categoryUrl = 'http://localhost:8080/api/product-category';
  private readonly http = inject(HttpClient);

  readonly productCategories = toSignal(this.getProductCategories(), { initialValue: [] });

  getProductList(): Observable<Product[]> {
    return this.http
      .get<GetResponseProducts>(this.baseUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getProductListPaginate(
    page: number,
    pageSize: number,
    sortOption: SortOption,
  ): Observable<GetResponseProducts> {
    const sort = this.getSortParameter(sortOption);
    return this.http.get<GetResponseProducts>(
      `${this.baseUrl}?page=${page}&size=${pageSize}&sort=${sort}`,
    );
  }

  private getSortParameter(sortOption: SortOption): string {
    switch (sortOption) {
      case 'name-desc':
        return 'name,desc';

      case 'price-asc':
        return 'unitPrice,asc';

      case 'price-desc':
        return 'unitPrice,desc';

      case 'name-asc':
      default:
        return 'name,asc';
    }
  }

  getProductsByCategoryPaginate(
    page: number,
    pageSize: number,
    categoryId: number,
    sortOption: SortOption,
  ): Observable<GetResponseProducts> {
    const sort = this.getSortParameter(sortOption);
    return this.http.get<GetResponseProducts>(
      `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}&sort=${sort}`,
    );
  }

  searchProductsPaginate(
    page: number,
    pageSize: number,
    keyword: string,
    sortOption: SortOption,
  ): Observable<GetResponseProducts> {
    const sort = this.getSortParameter(sortOption);
    return this.http.get<GetResponseProducts>(
      `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${page}&size=${pageSize}&sort=${sort}`,
    );
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http
      .get<GetResponseProducts>(`${this.baseUrl}/search/findByCategoryId?id=${categoryId}`)
      .pipe(map((response) => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http
      .get<GetResponseProductsCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProducts(keyword: string): Observable<Product[]> {
    return this.http
      .get<GetResponseProducts>(`${this.baseUrl}/search/findByNameContaining?name=${keyword}`)
      .pipe(
        tap((response) => console.log('SEARCH RESPONSE:', response)),
        map((response) => response._embedded.products),
      );
  }

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.http.get<Product>(productUrl);
  }
}
