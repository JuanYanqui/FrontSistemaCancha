import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterProovedorRoutingModule } from './register-proovedor-routing.module';
import { RegisterProveedorComponent } from './pages/register-proveedor/register-proveedor.component';

//PRIMENG MODULES IMPORTS
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastrModule } from 'ngx-toastr';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { ListProovedorModule } from '../list-proovedor/list-proovedor.module';

@NgModule({
  declarations: [
    RegisterProveedorComponent
  ],
  imports: [
    CommonModule,
    RegisterProovedorRoutingModule,
    SharedModule,
    RouterModule,
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
    ReactiveFormsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    TableModule,
    DialogModule,
    ListProovedorModule
  ],
  exports:[
    RegisterProveedorComponent
  ]
})
export class RegisterProovedorModule { }
