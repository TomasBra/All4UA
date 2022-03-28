import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeProviderComponent } from './add-home-provider.component';

describe('AddHomeProviderComponent', () => {
  let component: AddHomeProviderComponent;
  let fixture: ComponentFixture<AddHomeProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHomeProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
