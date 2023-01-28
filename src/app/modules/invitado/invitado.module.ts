import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitadoRoutingModule } from './invitado-routing.module';
import { WelcomeInvitadoComponent } from './welcome-invitado/welcome-invitado.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WelcomeInvitadoComponent
  ],
  imports: [
    CommonModule,
    InvitadoRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    WelcomeInvitadoComponent
  ]
})
export class InvitadoModule { }
