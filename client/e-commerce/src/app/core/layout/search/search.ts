import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  protected readonly router = inject(Router);
  private readonly searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((value) => {
      this.doSearch(value);
    });
  }

  search(value: string): void {
    this.searchSubject.next(value.trim());
  }

  doSearch(value: string): void {
    const keyword = value.trim();
    if (!keyword) {
      void this.router.navigateByUrl('/products');
      return;
    }
    void this.router.navigateByUrl(`/products/search/${keyword}`);
  }
}
