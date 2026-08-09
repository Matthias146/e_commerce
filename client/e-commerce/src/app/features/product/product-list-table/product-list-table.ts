import {Component, inject} from '@angular/core';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {ProductService} from '../product.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {LucideBadgeEuro, LucideBoxes, LucideImage, LucidePackage} from '@lucide/angular';

@Component({
  selector: 'app-product-list-table',
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    LucideImage,
    LucidePackage,
    LucideBadgeEuro,
    LucideBoxes
  ],
  templateUrl: './product-list-table.html',
  styleUrl: './product-list-table.scss',
})
export class ProductListTable {

  private readonly productService = inject(ProductService);

  readonly productsResource = rxResource({
    defaultValue: [],
    stream: () => this.productService.getProductList()
  });

  readonly products = this.productsResource.value;

}
