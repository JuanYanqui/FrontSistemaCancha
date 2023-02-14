import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCanchasComponent } from './registro-canchas.component';

describe('RegistroCanchasComponent', () => {
  let component: RegistroCanchasComponent;
  let fixture: ComponentFixture<RegistroCanchasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCanchasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCanchasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
