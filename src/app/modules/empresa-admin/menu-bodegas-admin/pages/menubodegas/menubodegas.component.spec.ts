import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubodegasComponent } from './menubodegas.component';

describe('MenubodegasComponent', () => {
  let component: MenubodegasComponent;
  let fixture: ComponentFixture<MenubodegasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenubodegasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenubodegasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
