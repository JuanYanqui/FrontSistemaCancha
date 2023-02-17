import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoCanchasComponent } from './catalogo-canchas.component';

describe('CatalogoCanchasComponent', () => {
  let component: CatalogoCanchasComponent;
  let fixture: ComponentFixture<CatalogoCanchasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoCanchasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoCanchasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
