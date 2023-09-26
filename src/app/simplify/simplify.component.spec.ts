import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplifyComponent } from './simplify.component';

describe('SimplifyComponent', () => {
  let component: SimplifyComponent;
  let fixture: ComponentFixture<SimplifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimplifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
