import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { RetailrocketService } from '../shared/services/retailrocket.service';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ LoadingComponent ],
      providers: [ RetailrocketService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has class loading--show if service status is loading', () => {
    const retailrocketService: RetailrocketService =
      fixture.debugElement.injector.get(RetailrocketService);

    retailrocketService.isLoading = true;
    fixture.detectChanges();

    const loadingElement = (fixture.nativeElement as HTMLElement).querySelector('.loading--show');
    expect(loadingElement).toBeTruthy();
  });
});
