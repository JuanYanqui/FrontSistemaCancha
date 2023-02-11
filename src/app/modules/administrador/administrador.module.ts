import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { WelcomeAdmistradorEstablecimientoComponent } from './welcome-admistrador-establecimiento/welcome-admistrador-establecimiento.component';


@NgModule({
  declarations: [WelcomeAdmistradorEstablecimientoComponent],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    SharedModule,
    RouterModule
  ],exports: [
    WelcomeAdmistradorEstablecimientoComponent
  ]
})
export class AdministradorModule { }
