import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RetailrocketService } from './shared/services/retailrocket.service';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SearchBarComponent
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
