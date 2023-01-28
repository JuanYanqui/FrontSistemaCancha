import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuPersonalAdminRoutingModule } from './menu-personal-admin-routing.module';
import { MenupersonalComponent } from './pages/menupersonal/menupersonal.component';


@NgModule({
  declarations: [
    MenupersonalComponent
  ],
  imports: [
    CommonModule,
    MenuPersonalAdminRoutingModule
  ],
  exports:[
    MenupersonalComponent
  ]
})
export class MenuPersonalAdminModule { }
