import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuReportesAdminRoutingModule } from './menu-reportes-admin-routing.module';
import { MenureportesComponent } from './pages/menureportes/menureportes.component';


@NgModule({
  declarations: [
    MenureportesComponent
  ],
  imports: [
    CommonModule,
    MenuReportesAdminRoutingModule
  ],
  exports:[
    MenureportesComponent
  ]
})
export class MenuReportesAdminModule { }
