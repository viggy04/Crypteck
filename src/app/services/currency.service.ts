import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private selectedCurrency$: BehaviorSubject<string> = new BehaviorSubject<string>("INR");

  constructor() { }

  getCurrency() {
    return this.selectedCurrency$.asObservable();
  }

  setCurrency(currency: string) {
    return this.selectedCurrency$.next(currency);
  }

}
