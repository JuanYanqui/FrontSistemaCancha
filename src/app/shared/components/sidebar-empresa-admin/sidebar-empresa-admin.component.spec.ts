import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEmpresaAdminComponent } from './sidebar-empresa-admin.component';

describe('SidebarEmpresaAdminComponent', () => {
  let component: SidebarEmpresaAdminComponent;
  let fixture: ComponentFixture<SidebarEmpresaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarEmpresaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarEmpresaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
