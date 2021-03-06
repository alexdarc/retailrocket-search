import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RetailrocketService } from './shared/services/retailrocket.service';

import { AppComponent } from './app.component';
import { CardComponent } from './products/card/card.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoadingComponent } from './loading/loading.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SearchBarComponent,
    LoadingComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [RetailrocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
