import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardgradientComponent } from './cardgradient.component';

describe('CardgradientComponent', () => {
  let component: CardgradientComponent;
  let fixture: ComponentFixture<CardgradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardgradientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardgradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
