import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProvidersComponent } from './home-providers.component';

describe('HomeProviderComponent', () => {
  let component: HomeProvidersComponent;
  let fixture: ComponentFixture<HomeProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
