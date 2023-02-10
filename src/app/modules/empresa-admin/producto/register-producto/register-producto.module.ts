import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterProductoRoutingModule } from './register-producto-routing.module';
import { RegisterProductoComponent } from './pages/register-producto/register-producto.component';

import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ImageModule } from 'primeng/image';
import { MessageModule } from 'primeng/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { DisponibilidadModule } from 'src/app/core/pipes/disponibilidad/disponibilidad.module';
import { DataViewModule } from 'primeng/dataview';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { MessagesModule } from 'primeng/messages';
@NgModule({
  declarations: [
    RegisterProductoComponent
  ],
  imports: [
    CommonModule,
    RegisterProductoRoutingModule,
    TableModule,
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    MessageModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MenubarModule,
    PanelModule,
    InputTextModule,
    ButtonModule, 
    KeyFilterModule,
    PasswordModule,
    FileUploadModule,
    DropdownModule,
    CardModule,
    InputMaskModule,
    TableModule,
    DialogModule,
    DisponibilidadModule,
    DataViewModule,
    InputNumberModule,
    ToolbarModule,
    MessagesModule,
    ImageModule,
    CheckboxModule

  ],
  exports:[
    RegisterProductoComponent
  ]
})
export class RegisterProductoModule { }
