import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';
import {
  Country,
  GetResponseCountries,
  GetResponseStates,
  State,
} from '../models/countries.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Service()
export class CheckoutService {
  private readonly countriesUrl = 'http://localhost:8080/api/countries';
  private readonly stateUrl = 'http://localhost:8080/api/states';
  private readonly selectedCountryCode = signal('');
  private readonly http = inject(HttpClient);

  getCountries(): Observable<Country[]> {
    return this.http
      .get<GetResponseCountries>(this.countriesUrl)
      .pipe(map((response) => response._embedded.countries));
  }

  getStates(countryCode: string): Observable<State[]> {
    const searchStateUrl = `${this.stateUrl}/search/findByCountryCode?code=${countryCode}`;
    return this.http
      .get<GetResponseStates>(searchStateUrl)
      .pipe(map((response) => response._embedded.states));
  }

  readonly countries = toSignal(this.getCountries(), { initialValue: [] });

  readonly states = toSignal(
    toObservable(this.selectedCountryCode).pipe(
      switchMap((code) => (code ? this.getStates(code) : of([]))),
    ),
    { initialValue: [] },
  );

  selectCountry(code: string): void {
    this.selectedCountryCode.set(code);
  }
}
