import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { GetResponseProducts, GetResponseProductsCategory, Product } from './product.interface';
import { ProductCategory } from './product-category/product-category';

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
}
