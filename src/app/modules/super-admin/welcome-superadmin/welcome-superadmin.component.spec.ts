import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSuperadminComponent } from './welcome-superadmin.component';

describe('WelcomeSuperadminComponent', () => {
  let component: WelcomeSuperadminComponent;
  let fixture: ComponentFixture<WelcomeSuperadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeSuperadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeSuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
