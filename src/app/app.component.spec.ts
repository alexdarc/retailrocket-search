import { Product } from './shared/models/product.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoadingComponent } from './loading/loading.component';
import { ProductsComponent } from './products/products.component';
import { CardComponent } from './products/card/card.component';
import { RetailrocketService } from './shared/services/retailrocket.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchBarComponent,
        LoadingComponent,
        ProductsComponent,
        CardComponent,
      ],
      providers: [ RetailrocketService ],
      imports: [ FormsModule, HttpClientTestingModule ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should contain search bar component', () => {
    const appElement: HTMLElement = fixture.nativeElement;
    const searchBar = appElement.querySelector('app-search-bar');

    expect(searchBar).toBeTruthy();
  });

  it('should contain loading component', () => {
    const appElement: HTMLElement = fixture.nativeElement;
    const loading = appElement.querySelector('app-loading');

    expect(loading).toBeTruthy();
  });

  it('should contain products component only if products are defined', () => {
    const appElement: HTMLElement = fixture.nativeElement;
    let products = appElement.querySelector('app-products');

    expect(products).not.toBeTruthy();

    const mockProducts: Product[] = [{ItemId: 1, Name: 'test'}];
    component.products = mockProducts;
    fixture.detectChanges();

    products = appElement.querySelector('app-products');

    expect(products).toBeTruthy();
  });

  it('should define products when calls onSearchInput as result of forSearch service function', () => {
    const retailrocketService: RetailrocketService =
      fixture.debugElement.injector.get(RetailrocketService);

    const mockProducts: Product[] = [{ItemId: 1, Name: 'test'}];
    const searchSpy = spyOn(retailrocketService, 'forSearch')
      .and.returnValue(of(mockProducts));

    component.onSearchInput('test');

    expect(searchSpy).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  });
});
