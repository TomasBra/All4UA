import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHomeProviderComponent } from './update-home-provider.component';

describe('UpdateHomeProviderComponent', () => {
  let component: UpdateHomeProviderComponent;
  let fixture: ComponentFixture<UpdateHomeProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHomeProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHomeProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
