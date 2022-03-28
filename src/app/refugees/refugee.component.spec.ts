import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefugeeComponent } from './refugee.component';

describe('LookingForPickupComponent', () => {
  let component: RefugeeComponent;
  let fixture: ComponentFixture<RefugeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefugeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefugeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
