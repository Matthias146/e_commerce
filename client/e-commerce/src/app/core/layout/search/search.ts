import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  protected readonly router = inject(Router);

  doSearch(value: string): void {
    const keyword = value.trim();
    if (!keyword) return;
    void this.router.navigateByUrl(`products/search/${keyword}`);
  }
}
