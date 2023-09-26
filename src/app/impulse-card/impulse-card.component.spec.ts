import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpulseCardComponent } from './impulse-card.component';

describe('ImpulseCardComponent', () => {
  let component: ImpulseCardComponent;
  let fixture: ComponentFixture<ImpulseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpulseCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpulseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
