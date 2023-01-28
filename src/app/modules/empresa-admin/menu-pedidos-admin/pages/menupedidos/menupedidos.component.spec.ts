import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenupedidosComponent } from './menupedidos.component';

describe('MenupedidosComponent', () => {
  let component: MenupedidosComponent;
  let fixture: ComponentFixture<MenupedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenupedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenupedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
