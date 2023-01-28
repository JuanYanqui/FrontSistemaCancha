import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaAdminEmpComponent } from './bienvenida-admin-emp.component';

describe('BienvenidaAdminEmpComponent', () => {
  let component: BienvenidaAdminEmpComponent;
  let fixture: ComponentFixture<BienvenidaAdminEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienvenidaAdminEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidaAdminEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
