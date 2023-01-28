import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaAdminEmpRoutingModule } from './bienvenida-admin-emp-routing.module';
import { BienvenidaAdminEmpComponent } from './pages/bienvenida-admin-emp/bienvenida-admin-emp.component';



@NgModule({
  declarations: [
  BienvenidaAdminEmpComponent
  ],
  imports: [
    CommonModule,
    BienvenidaAdminEmpRoutingModule
  ],
  exports:[
    BienvenidaAdminEmpComponent
  ]
})
export class BienvenidaAdminEmpModule { }
