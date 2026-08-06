import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map, Observable} from 'rxjs';
import {GetResponse, Product} from './product.interface';

@Service()
export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/api';
  private readonly http = inject(HttpClient);

  getProductList(): Observable<Product[]> {
    return this.http.get<GetResponse>(`${this.baseUrl}/products`)
      .pipe(map(response => response._embedded.products));
  }
}

