import { TestBed, getTestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RetailrocketService } from './retailrocket.service';
import { Product } from '../models/product.model';

describe('RetailrocketService', () => {
  let injector: TestBed;
  let service: RetailrocketService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RetailrocketService],
    });

    injector = getTestBed();
    service = injector.get(RetailrocketService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return formed api url', () => {
    const input = 'test';
    const output = service.API_URL + 'test&format=json';

    expect(service.getApiUrl(input)).toBe(output);
  });

  it('should return observable with 2 products (Observable<Product[]>)', () => {
    const mockProducts: Product[] = [
      {
        ItemId: 101,
        Name: 'test name 1',
      },
      {
        ItemId: 102,
        Name: 'test name 2',
      }
    ];
    const input = 'test';
    const output = service.API_URL + `Search/${service.PARTNER_ID}/?&phrase=${input}&format=json`;

    service.forSearch(input).subscribe((products: Product[]) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    httpMock
      .expectOne({
        method: 'GET',
        url: output,
      })
      .flush(mockProducts);
  });

  it('should return observable with empty array (Observable<Product[]>)', () => {
    const mockProducts: Product[] = [];
    const input = 'test';
    const output = service.API_URL + `Search/${service.PARTNER_ID}/?&phrase=${input}&format=json`;

    service.forSearch(input).subscribe((products: Product[]) => {
      expect(products.length).toBe(0);
      expect(products).toEqual(mockProducts);
    });

    httpMock
      .expectOne({
        method: 'GET',
        url: output,
      })
      .flush(mockProducts);
  });

  it('should start loading when call forSearch', () => {
    expect(service.isLoading).toBe(false);

    service.forSearch('test');

    expect(service.isLoading).toBe(true);
  });

  it('should end loading when forSearch request is complete', () => {
    service.isLoading = true;

    service.forSearch('test').subscribe(() => {
      expect(service.isLoading).toBe(false);
    });

    httpMock.expectOne({}).flush(null);
  });
});
