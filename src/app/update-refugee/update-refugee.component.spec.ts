import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRefugeeComponent } from './update-refugee.component';

describe('UpdateRefugeeComponent', () => {
  let component: UpdateRefugeeComponent;
  let fixture: ComponentFixture<UpdateRefugeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRefugeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRefugeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
