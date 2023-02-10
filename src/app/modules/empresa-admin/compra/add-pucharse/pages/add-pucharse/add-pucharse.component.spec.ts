import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPucharseComponent } from './add-pucharse.component';

describe('AddPucharseComponent', () => {
  let component: AddPucharseComponent;
  let fixture: ComponentFixture<AddPucharseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPucharseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPucharseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
