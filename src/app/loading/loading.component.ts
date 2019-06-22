import { RetailrocketService } from './../shared/services/retailrocket.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  constructor(private retailrocketService: RetailrocketService) { }

}
