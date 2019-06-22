import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { CardComponent } from './card/card.component';
import { Product } from '../shared/models/product.model';
import { RetailrocketService } from '../shared/services/retailrocket.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [
        ProductsComponent,
        CardComponent,
      ],
      providers: [ RetailrocketService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all products of input', () => {
    const mockProducts: Product[] = [
      { ItemId: 1, Name: 'test 1' },
      { ItemId: 2, Name: 'test 2' },
    ];
    component.products = mockProducts;
    fixture.detectChanges();

    const productsElement: HTMLElement = fixture.nativeElement;
    const cardsCount = productsElement.querySelectorAll('app-card').length;

    expect(cardsCount).toBe(mockProducts.length);
  });
});
