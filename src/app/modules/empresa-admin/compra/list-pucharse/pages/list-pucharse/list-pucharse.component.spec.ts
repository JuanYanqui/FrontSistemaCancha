import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPucharseComponent } from './list-pucharse.component';

describe('ListPucharseComponent', () => {
  let component: ListPucharseComponent;
  let fixture: ComponentFixture<ListPucharseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPucharseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPucharseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
