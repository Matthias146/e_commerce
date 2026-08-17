import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable, tap } from 'rxjs';
import {
  GetResponseProducts,
  GetResponseProductsCategory,
  Product,
} from '../models/product.interface';
import { ProductCategory } from '../../product-category/product-category';

@Service()
export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/api/products';
  private readonly categoryUrl = 'http://localhost:8080/api/product-category';
  private readonly http = inject(HttpClient);

  getProductList(): Observable<Product[]> {
    return this.http
      .get<GetResponseProducts>(this.baseUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getProductListPaginate(page: number, pageSize: number): Observable<GetResponseProducts> {
    return this.http.get<GetResponseProducts>(`${this.baseUrl}?page=${page}&size=${pageSize}`);
  }

  getProductsByCategoryPaginate(
    page: number,
    pageSize: number,
    categoryId: number,
  ): Observable<GetResponseProducts> {
    return this.http.get<GetResponseProducts>(
      `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`,
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
