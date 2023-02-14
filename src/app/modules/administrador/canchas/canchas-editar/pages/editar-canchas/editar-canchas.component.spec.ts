import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCanchasComponent } from './editar-canchas.component';

describe('EditarCanchasComponent', () => {
  let component: EditarCanchasComponent;
  let fixture: ComponentFixture<EditarCanchasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCanchasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCanchasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
