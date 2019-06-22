import { async, ComponentFixture, TestBed, flush, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let searchBarElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [ FormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    searchBarElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search when input', () => {
    const inputElement: HTMLInputElement = searchBarElement.querySelector('.search-input');
    const searchSpy = spyOn(component, 'search');

    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));

    expect(searchSpy).toHaveBeenCalled();
  });

  it('should change searchValue when input', () => {
    const inputElement: HTMLInputElement = searchBarElement.querySelector('.search-input');
    const mockValue = 'test';

    inputElement.value = mockValue;
    inputElement.dispatchEvent(new Event('input'));

    expect(component.searchValue).toBe(mockValue);
  });

  it('should call search when click button and searchValue is NOT empty', () => {
    const buttonElement: HTMLButtonElement = searchBarElement.querySelector('.search-submit');
    const searchSpy = spyOn(component, 'search');

    component.searchValue = 'test';
    fixture.detectChanges();
    buttonElement.click();

    fixture.whenStable()
      .then(() => {
        expect(searchSpy).toHaveBeenCalled();
      });
  });

  it('should NOT call search when click button and searchValue is empty', () => {
    const buttonElement: HTMLButtonElement = searchBarElement.querySelector('.search-submit');
    const searchSpy = spyOn(component, 'search');

    component.searchValue = '';
    fixture.detectChanges();
    buttonElement.click();

    fixture.whenStable()
      .then(() => {
        expect(searchSpy).not.toHaveBeenCalled();
      });
  });

  it('should call output when call search', fakeAsync(() => {
    const mockValue = 'test';

    component.searchInput.subscribe((value: string) => {
      expect(value).toBe(mockValue);
    });

    component.searchValue = mockValue;
    component.search();

    flush();
  }));

  it('should call output once in debounce time when call search', fakeAsync(() => {
    const outputSpy = spyOn(component.searchInput, 'emit');

    component.search();
    component.search();
    component.search();

    flush();

    expect(outputSpy).toHaveBeenCalledTimes(1);
  }));
});
