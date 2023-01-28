import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirenvenidalogComponent } from './birenvenidalog.component';

describe('BirenvenidalogComponent', () => {
  let component: BirenvenidalogComponent;
  let fixture: ComponentFixture<BirenvenidalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirenvenidalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirenvenidalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
