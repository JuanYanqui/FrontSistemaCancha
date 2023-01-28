import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmpresaAdminComponent } from './dashboard-empresa-admin.component';

describe('DashboardEmpresaAdminComponent', () => {
  let component: DashboardEmpresaAdminComponent;
  let fixture: ComponentFixture<DashboardEmpresaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEmpresaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmpresaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
