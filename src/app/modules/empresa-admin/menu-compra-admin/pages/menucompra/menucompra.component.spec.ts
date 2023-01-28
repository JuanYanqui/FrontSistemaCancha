import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenucompraComponent } from './menucompra.component';

describe('MenucompraComponent', () => {
  let component: MenucompraComponent;
  let fixture: ComponentFixture<MenucompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenucompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenucompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
