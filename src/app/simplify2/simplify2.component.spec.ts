import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Simplify2Component } from './simplify2.component';

describe('Simplify2Component', () => {
  let component: Simplify2Component;
  let fixture: ComponentFixture<Simplify2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Simplify2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Simplify2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
