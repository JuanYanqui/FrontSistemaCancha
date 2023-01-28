import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenupersonalComponent } from './menupersonal.component';

describe('MenupersonalComponent', () => {
  let component: MenupersonalComponent;
  let fixture: ComponentFixture<MenupersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenupersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenupersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
