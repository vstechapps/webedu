import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedeComponent } from './threede.component';

describe('ThreedeComponent', () => {
  let component: ThreedeComponent;
  let fixture: ComponentFixture<ThreedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreedeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
