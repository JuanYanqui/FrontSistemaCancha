import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGestionPedidosComponent } from './list-gestion-pedidos.component';

describe('ListGestionPedidosComponent', () => {
  let component: ListGestionPedidosComponent;
  let fixture: ComponentFixture<ListGestionPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGestionPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGestionPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
