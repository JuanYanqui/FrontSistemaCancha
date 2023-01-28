import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuSpradminRoutingModule } from './menu-spradmin-routing.module';
import { MenuspradminComponent } from './pages/menuspradmin/menuspradmin.component';


@NgModule({
  declarations: [
    MenuspradminComponent
  ],
  imports: [
    CommonModule,
    MenuSpradminRoutingModule
  ],
  exports:[
    MenuspradminComponent
  ]
})
export class MenuSpradminModule { }
