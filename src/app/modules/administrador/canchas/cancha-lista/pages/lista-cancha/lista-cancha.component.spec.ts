import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCanchaComponent } from './lista-cancha.component';

describe('ListaCanchaComponent', () => {
  let component: ListaCanchaComponent;
  let fixture: ComponentFixture<ListaCanchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCanchaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCanchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
