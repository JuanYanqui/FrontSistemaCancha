import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';


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

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    FileUploadModule,
    DropdownModule,
    CardModule,
    ToastrModule.forRoot(),
    InputMaskModule,
    TableModule,
    DialogModule,
    KeyFilterModule,
    ToggleButtonModule,
    RouterModule,
    SharedModule,
    MatTabsModule,
    MatTableModule,
    MatNativeDateModule,
    DividerModule
  ],
  exports:[
    LoginComponent
  ]
})
export class AuthModule { }
