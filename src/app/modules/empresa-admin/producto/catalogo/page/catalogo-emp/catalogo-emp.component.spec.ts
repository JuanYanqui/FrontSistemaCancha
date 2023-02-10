import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoEmpComponent } from './catalogo-emp.component';

describe('CatalogoEmpComponent', () => {
  let component: CatalogoEmpComponent;
  let fixture: ComponentFixture<CatalogoEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
