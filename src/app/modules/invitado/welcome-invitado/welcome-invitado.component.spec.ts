import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeInvitadoComponent } from './welcome-invitado.component';

describe('WelcomeInvitadoComponent', () => {
  let component: WelcomeInvitadoComponent;
  let fixture: ComponentFixture<WelcomeInvitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeInvitadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
