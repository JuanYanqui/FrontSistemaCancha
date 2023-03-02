import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuComponent } from './registro-usu.component';

describe('RegistroUsuComponent', () => {
  let component: RegistroUsuComponent;
  let fixture: ComponentFixture<RegistroUsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUsuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroUsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
