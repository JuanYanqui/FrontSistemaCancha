import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanchasRegistroRoutingModule } from './canchas-registro-routing.module';
import { RegistroCanchasComponent } from './pages/registro-canchas/registro-canchas.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { EditUsuariosModule } from 'src/app/modules/super-admin/usuarioadmin/edit-usuarios/edit-usuarios.module';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CanchasEditarModule } from '../canchas-editar/canchas-editar.module';


@NgModule({
  declarations: [
    RegistroCanchasComponent
  ],
  imports: [
    CommonModule,
    CanchasRegistroRoutingModule,

    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    KeyFilterModule,
    InputTextModule,
    EditUsuariosModule,
    CanchasEditarModule



    ,
    MatTableModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    PasswordModule,
    InputMaskModule,
    ToggleButtonModule,
    DividerModule,
    FileUploadModule,
    DropdownModule,
    MenubarModule,
    ButtonModule,
    CardModule,
    TableModule,
    DialogModule,
  ]
})
export class CanchasRegistroModule { }
