import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuspradminComponent } from './menuspradmin.component';

describe('MenuspradminComponent', () => {
  let component: MenuspradminComponent;
  let fixture: ComponentFixture<MenuspradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuspradminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuspradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
