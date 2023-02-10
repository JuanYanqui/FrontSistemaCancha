import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterBodegaRoutingModule } from './register-bodega-routing.module';
import { RegisterBodegaComponent } from './pages/register-bodega/register-bodega.component';

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
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DisponibilidadModule } from 'src/app/core/pipes/disponibilidad/disponibilidad.module';
import { ListBodegaModule } from '../list-bodega/list-bodega.module';

@NgModule({
    declarations: [
        RegisterBodegaComponent
    ],
    imports: [
        CommonModule,
        RegisterBodegaRoutingModule,
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
        FileUploadModule,
        NgxSpinnerModule,
        DisponibilidadModule,
        ListBodegaModule,
        
    ],
    exports:[
      RegisterBodegaComponent
    ]
})
export class RegisterBodegaModule { }
