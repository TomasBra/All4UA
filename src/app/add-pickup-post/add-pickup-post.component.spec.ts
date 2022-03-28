import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPickupPostComponent } from './add-pickup-post.component';

describe('AddPickupPostComponent', () => {
  let component: AddPickupPostComponent;
  let fixture: ComponentFixture<AddPickupPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPickupPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPickupPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
