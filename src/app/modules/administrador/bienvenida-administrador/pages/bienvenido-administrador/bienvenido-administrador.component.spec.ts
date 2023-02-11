import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidoAdministradorComponent } from './bienvenido-administrador.component';

describe('BienvenidoAdministradorComponent', () => {
  let component: BienvenidoAdministradorComponent;
  let fixture: ComponentFixture<BienvenidoAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienvenidoAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidoAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
