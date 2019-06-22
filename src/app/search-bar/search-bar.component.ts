import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  readonly DEBOUNCE_TIMEOUT = 50;

  @Output() searchInput = new EventEmitter<string>();

  searchValue = '';
  timeoutId: any;

  constructor() { }

  ngOnInit() {
  }

  search() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.searchInput.emit(this.searchValue);
    }, this.DEBOUNCE_TIMEOUT);
  }
}
