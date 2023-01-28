import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSuperAdminUserComponent } from './menu-super-admin-user.component';

describe('MenuSuperAdminUserComponent', () => {
  let component: MenuSuperAdminUserComponent;
  let fixture: ComponentFixture<MenuSuperAdminUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSuperAdminUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSuperAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
