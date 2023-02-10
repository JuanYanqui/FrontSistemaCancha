import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListInventarioRoutingModule } from './list-inventario-routing.module';
import { ListInventariosComponent } from './pages/list-inventarios/list-inventarios.component';

import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastrModule } from 'ngx-toastr';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { ToggleButtonModule } from 'primeng/togglebutton';
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
import { PDFStream } from 'canvas';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { BadgeModule } from 'primeng/badge';


@NgModule({
  declarations: [
    ListInventariosComponent
  ],
  imports: [
    CommonModule,
    ListInventarioRoutingModule,

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
    TooltipModule,
    ToolbarModule,


    CommonModule, TableModule, ButtonModule, DropdownModule, FormsModule, DialogModule, ToolbarModule, MessagesModule, BadgeModule,InputMaskModule,



  ],
  exports:[
    ListInventariosComponent
  ]
})
export class ListInventarioModule { }
