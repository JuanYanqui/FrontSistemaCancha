import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlinvComponent } from './controlinv.component';

describe('ControlinvComponent', () => {
  let component: ControlinvComponent;
  let fixture: ComponentFixture<ControlinvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlinvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlinvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
