import {Component} from '@angular/core';
import {Header} from './header/header';
import {Sidebar} from './sidebar/sidebar';
import {Footer} from './footer/footer';
import {ProductListTable} from '../../features/product/product-list-table/product-list-table';

@Component({
  selector: 'app-layout',
  imports: [
    Header,
    Sidebar,
    Footer,
    ProductListTable
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
}
