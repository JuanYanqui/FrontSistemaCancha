import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioadminRoutingModule } from './usuarioadmin-routing.module';
import { EditUsuariosModule } from './edit-usuarios/edit-usuarios.module';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsuarioadminRoutingModule,
    SharedModule,
    RouterModule,
    
  ]
})
export class UsuarioadminModule { }
