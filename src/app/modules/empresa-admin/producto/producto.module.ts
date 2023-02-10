import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoRoutingModule } from './producto-routing.module';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
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
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DisponibilidadModule } from 'src/app/core/pipes/disponibilidad/disponibilidad.module';
import { DataViewModule } from 'primeng/dataview';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    SharedModule,
    RouterModule,
  
  ]
})
export class ProductoModule { }
