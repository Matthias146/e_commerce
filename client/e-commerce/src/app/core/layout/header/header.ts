import { Component } from '@angular/core';
import { Search } from '../search/search';
import { CardStatus } from '../../../features/product/components/card-status/card-status';

@Component({
  selector: 'app-header',
  imports: [Search, CardStatus],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
