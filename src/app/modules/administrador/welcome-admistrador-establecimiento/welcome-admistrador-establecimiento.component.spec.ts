import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeAdmistradorEstablecimientoComponent } from './welcome-admistrador-establecimiento.component';

describe('WelcomeAdmistradorEstablecimientoComponent', () => {
  let component: WelcomeAdmistradorEstablecimientoComponent;
  let fixture: ComponentFixture<WelcomeAdmistradorEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeAdmistradorEstablecimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeAdmistradorEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
