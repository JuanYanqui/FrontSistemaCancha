import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProductoComponent } from './register-producto.component';

describe('RegisterProductoComponent', () => {
  let component: RegisterProductoComponent;
  let fixture: ComponentFixture<RegisterProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
