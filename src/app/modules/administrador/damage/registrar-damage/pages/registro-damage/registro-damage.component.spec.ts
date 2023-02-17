import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDamageComponent } from './registro-damage.component';

describe('RegistroDamageComponent', () => {
  let component: RegistroDamageComponent;
  let fixture: ComponentFixture<RegistroDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDamageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
