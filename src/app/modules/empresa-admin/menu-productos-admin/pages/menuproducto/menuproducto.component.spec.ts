import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuproductoComponent } from './menuproducto.component';

describe('MenuproductoComponent', () => {
  let component: MenuproductoComponent;
  let fixture: ComponentFixture<MenuproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuproductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
