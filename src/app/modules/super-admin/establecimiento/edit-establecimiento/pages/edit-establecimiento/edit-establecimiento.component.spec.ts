import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstablecimientoComponent } from './edit-establecimiento.component';

describe('EditEstablecimientoComponent', () => {
  let component: EditEstablecimientoComponent;
  let fixture: ComponentFixture<EditEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEstablecimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
