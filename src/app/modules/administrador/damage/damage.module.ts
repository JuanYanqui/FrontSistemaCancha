import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DamageRoutingModule } from './damage-routing.module';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DamageRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class DamageModule { }
