import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaRoutingModule } from './bienvenida-routing.module';
import { BirenvenidalogComponent } from './pages/birenvenidalog/birenvenidalog.component';


@NgModule({
  declarations: [
    BirenvenidalogComponent
  ],
  imports: [
    CommonModule,
    BienvenidaRoutingModule
  ],
  exports:[
    BirenvenidalogComponent
  ]
})
export class BienvenidaModule { }
