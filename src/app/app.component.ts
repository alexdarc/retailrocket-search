import { Component, OnInit } from '@angular/core';

import { RetailrocketService } from './shared/services/retailrocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchValue: string;

  constructor(private retailrocketService: RetailrocketService) {}

  ngOnInit() {
    this.retailrocketService.forSearch('test')
      .subscribe((...rest) => {
        console.log('subscribe', rest);
      });
  }

  onSearchInput(value: string) {
    this.searchValue = value;
  }
}
