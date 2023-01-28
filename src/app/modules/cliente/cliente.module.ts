import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { WelcomeClienteComponent } from './welcome-cliente/welcome-cliente.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    WelcomeClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    WelcomeClienteComponent
  ]
})
export class ClienteModule { }
