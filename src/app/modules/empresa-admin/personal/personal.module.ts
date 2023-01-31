import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports:[

  ]
})
export class PersonalModule { }
