import { Component } from '@angular/core';

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
    this.retailrocketService.forSearch(value)
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }
}
