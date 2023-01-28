import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardEmpresaAdminRoutingModule } from './dashboard-empresa-admin-routing.module';
import { DashboardEmpresaAdminComponent } from './page/dashboard-empresa-admin/dashboard-empresa-admin.component';


@NgModule({
  declarations: [
    DashboardEmpresaAdminComponent
  ],
  imports: [
    CommonModule,
    DashboardEmpresaAdminRoutingModule
  ],
  exports:[
    DashboardEmpresaAdminComponent
  ]
})
export class DashboardEmpresaAdminModule { }
