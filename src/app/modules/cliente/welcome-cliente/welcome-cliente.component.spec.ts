import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeClienteComponent } from './welcome-cliente.component';

describe('WelcomeClienteComponent', () => {
  let component: WelcomeClienteComponent;
  let fixture: ComponentFixture<WelcomeClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
