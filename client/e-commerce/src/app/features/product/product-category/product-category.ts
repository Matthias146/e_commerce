import {Component, signal} from '@angular/core';


@Component({
  selector: 'app-product-category',
  imports: [],
  templateUrl: './product-category.html',
  styleUrl: './product-category.scss',
})
export class ProductCategory {
  id = signal(0);
  categoryName = signal("");
}

