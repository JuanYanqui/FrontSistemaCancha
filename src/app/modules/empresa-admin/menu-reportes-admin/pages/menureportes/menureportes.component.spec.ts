import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenureportesComponent } from './menureportes.component';

describe('MenureportesComponent', () => {
  let component: MenureportesComponent;
  let fixture: ComponentFixture<MenureportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenureportesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenureportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
