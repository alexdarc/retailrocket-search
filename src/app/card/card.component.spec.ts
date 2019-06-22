import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CardComponent } from './card.component';
import { RetailrocketService } from '../shared/services/retailrocket.service';
import { Product } from '../shared/models/product.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cardElement: HTMLElement;
  const mockProduct: Product = {
    ItemId: 101,
    Name: 'test name 1',
    Url: 'http://test.com/',
    Vendor: 'test vendor',
    Description: 'test description',
    Price: 100,
    OldPrice: 200,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ CardComponent ],
      providers: [ RetailrocketService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    // Присваиваем фейковый товар в Input
    component.product = mockProduct;

    fixture.detectChanges();

    cardElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain partnerId from service', () => {
    const retailrocketService: RetailrocketService =
      fixture.debugElement.injector.get(RetailrocketService);

    expect(component.partnerId).toBe(retailrocketService.PARTNER_ID);
  });

  it('should contain image with partnerId and itemId', () => {
    const image: HTMLImageElement = cardElement.querySelector('.card-img-top');

    expect(image).toBeTruthy();
    expect(image.src).toContain(component.partnerId);
    expect(image.src).toContain(String(mockProduct.ItemId));
  });

  it('should contain information about product', () => {
    const image: HTMLImageElement = cardElement.querySelector('.card-img-top');
    const title: HTMLHeadingElement = cardElement.querySelector('.card-title');
    const description: HTMLParagraphElement = cardElement.querySelector('.description');
    const currentPrice: HTMLElement = cardElement.querySelector('.price-current');
    const oldPrice: HTMLElement = cardElement.querySelector('.price-old');

    expect(image).toBeTruthy();
    expect(image.alt).toBe(mockProduct.Name);

    expect(title).toBeTruthy();
    expect(title.textContent.trim()).toBe(mockProduct.Vendor);

    expect(description).toBeTruthy();
    expect(description.textContent.trim()).toBe(mockProduct.Description);

    expect(currentPrice).toBeTruthy();
    expect(currentPrice.textContent.trim()).toBe(`${mockProduct.Price} руб.`);

    expect(oldPrice).toBeTruthy();
    expect(oldPrice.textContent.trim()).toBe(`${mockProduct.OldPrice} руб.`);
  });

  it('should contain product url inside all links', () => {
    const anchorElements: HTMLAnchorElement[] = Array.from(cardElement.querySelectorAll('a[href]'));

    anchorElements.forEach((anchorElement) => {
      expect(anchorElement.href).toBe(mockProduct.Url);
    });
  });

  it('should not contain old price if it is less than current price', () => {
    mockProduct.OldPrice = 0;
    fixture.detectChanges();

    const oldPrice: HTMLElement = cardElement.querySelector('.price-old');

    expect(oldPrice).not.toBeTruthy();
  });
});
