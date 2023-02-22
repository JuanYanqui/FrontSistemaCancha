import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanchasRoutingModule } from './canchas-routing.module';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CanchasRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class CanchasModule { }
