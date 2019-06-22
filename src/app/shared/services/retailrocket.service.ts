import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Product } from '../models/product.model';

@Injectable()
export class RetailrocketService {
  readonly PARTNER_ID = '523bf7210d422d33b4cacda5';
  readonly API_URL = 'https://api.retailrocket.net/api/2.0/recommendation/';

  isLoading = false;

  constructor(private http: HttpClient) { }

  private startLoading() {
    this.isLoading = true;
  }

  private endLoading() {
    this.isLoading = false;
  }

  getApiUrl(url: string): string {
    return this.API_URL + url + '&format=json';
  }

  forSearch(phrase: string): Observable<Product[]> {
    const searchUrl = this.getApiUrl(`Search/${this.PARTNER_ID}/?&phrase=${phrase}`);

    this.startLoading();
    return this.http.get<Product[]>(searchUrl)
      .pipe(tap(() => {
        this.endLoading();
      }));
  }
}
