import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuSuperAdminUserRoutingModule } from './menu-super-admin-user-routing.module';
import { MenuSuperAdminUserComponent } from './pages/menu-super-admin-user/menu-super-admin-user.component';


@NgModule({
  declarations: [
    MenuSuperAdminUserComponent
  ],
  imports: [
    CommonModule,
    MenuSuperAdminUserRoutingModule
  ],
  exports:[
    MenuSuperAdminUserComponent
  ]
})
export class MenuSuperAdminUserModule { }
