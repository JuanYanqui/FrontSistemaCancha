import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVentanaComponent } from './edit-ventana.component';

describe('EditVentanaComponent', () => {
  let component: EditVentanaComponent;
  let fixture: ComponentFixture<EditVentanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVentanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVentanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
