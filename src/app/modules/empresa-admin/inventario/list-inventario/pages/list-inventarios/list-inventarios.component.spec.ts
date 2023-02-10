import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInventariosComponent } from './list-inventarios.component';

describe('ListInventariosComponent', () => {
  let component: ListInventariosComponent;
  let fixture: ComponentFixture<ListInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInventariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
