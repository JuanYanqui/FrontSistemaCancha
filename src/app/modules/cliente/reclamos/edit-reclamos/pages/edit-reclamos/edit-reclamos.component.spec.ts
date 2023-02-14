import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReclamosComponent } from './edit-reclamos.component';

describe('EditReclamosComponent', () => {
  let component: EditReclamosComponent;
  let fixture: ComponentFixture<EditReclamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReclamosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReclamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
