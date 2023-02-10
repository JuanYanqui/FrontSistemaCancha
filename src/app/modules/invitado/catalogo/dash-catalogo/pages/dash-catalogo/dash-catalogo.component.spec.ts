import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCatalogoComponent } from './dash-catalogo.component';

describe('DashCatalogoComponent', () => {
  let component: DashCatalogoComponent;
  let fixture: ComponentFixture<DashCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashCatalogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
