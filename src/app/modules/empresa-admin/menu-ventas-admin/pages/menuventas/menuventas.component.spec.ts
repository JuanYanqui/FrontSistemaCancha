import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuventasComponent } from './menuventas.component';

describe('MenuventasComponent', () => {
  let component: MenuventasComponent;
  let fixture: ComponentFixture<MenuventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuventasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
