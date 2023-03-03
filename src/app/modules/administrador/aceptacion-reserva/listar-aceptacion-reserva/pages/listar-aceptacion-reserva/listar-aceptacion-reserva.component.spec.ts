import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAceptacionReservaComponent } from './listar-aceptacion-reserva.component';

describe('ListarAceptacionReservaComponent', () => {
  let component: ListarAceptacionReservaComponent;
  let fixture: ComponentFixture<ListarAceptacionReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAceptacionReservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAceptacionReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
