import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarUsuariosRoutingModule } from './registrar-usuarios-routing.module';
import { RegistroUsuariosComponent } from './pages/registro-usuarios/registro-usuarios.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { PanelModule } from 'primeng/panel';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastrModule } from 'ngx-toastr';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { EditUsuariosModule } from '../edit-usuarios/edit-usuarios.module';


@NgModule({
  declarations: [
    RegistroUsuariosComponent
  ],
  imports: [
    CommonModule,
    RegistrarUsuariosRoutingModule,
    MatTableModule,
    MatTabsModule,
    PanelModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTabsModule,
    KeyFilterModule,
    ToastrModule.forRoot(),
    PasswordModule,
    InputMaskModule,
    ToggleButtonModule,
    DividerModule,
    FileUploadModule,
    DropdownModule,
    PanelModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    TableModule,
    DialogModule,
    EditUsuariosModule
    
    
  ]
})
export class RegistrarUsuariosModule { }
