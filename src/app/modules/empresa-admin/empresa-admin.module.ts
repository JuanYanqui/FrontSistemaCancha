import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaAdminRoutingModule } from './empresa-admin-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { WelcomeEmpresaAdminComponent } from './welcome-empresa-admin/welcome-empresa-admin.component';


@NgModule({
  declarations: [WelcomeEmpresaAdminComponent],
  imports: [
    CommonModule,
    EmpresaAdminRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    WelcomeEmpresaAdminComponent
  ]
})
export class EmpresaAdminModule { }
