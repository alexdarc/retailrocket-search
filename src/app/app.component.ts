import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { RetailrocketService } from './shared/services/retailrocket.service';
import { Product } from './shared/models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: Product[];

  constructor(private retailrocketService: RetailrocketService) {}

  onSearchInput(value: string) {
    const searchSub: Subscription = this.retailrocketService.forSearch(value)
      .subscribe((products: Product[]) => {
        searchSub.unsubscribe();

        this.products = products;
      });
  }
}
