import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../shared/models/product.model';
import { RetailrocketService } from '../../shared/services/retailrocket.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() product: Product;
  partnerId: string;

  constructor(private retailrocketService: RetailrocketService) { }

  ngOnInit() {
    this.partnerId = this.retailrocketService.PARTNER_ID;
  }

}
