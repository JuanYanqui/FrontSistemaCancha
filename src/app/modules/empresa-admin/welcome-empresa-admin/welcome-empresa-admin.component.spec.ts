import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeEmpresaAdminComponent } from './welcome-empresa-admin.component';

describe('WelcomeEmpresaAdminComponent', () => {
  let component: WelcomeEmpresaAdminComponent;
  let fixture: ComponentFixture<WelcomeEmpresaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeEmpresaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeEmpresaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
