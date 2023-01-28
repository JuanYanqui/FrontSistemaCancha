import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { WelcomeSuperadminComponent } from './welcome-superadmin/welcome-superadmin.component';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WelcomeSuperadminComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule,
    RouterModule
  ],
exports:[
  WelcomeSuperadminComponent
]
})
export class SuperAdminModule { }
