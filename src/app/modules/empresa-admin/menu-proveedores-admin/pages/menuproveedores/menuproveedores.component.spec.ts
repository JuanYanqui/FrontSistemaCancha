import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuproveedoresComponent } from './menuproveedores.component';

describe('MenuproveedoresComponent', () => {
  let component: MenuproveedoresComponent;
  let fixture: ComponentFixture<MenuproveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuproveedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuproveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
