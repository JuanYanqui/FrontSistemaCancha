import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class CatalogoModule { }
