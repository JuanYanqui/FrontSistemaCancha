import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDamageComponent } from './lista-damage.component';

describe('ListaDamageComponent', () => {
  let component: ListaDamageComponent;
  let fixture: ComponentFixture<ListaDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDamageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
