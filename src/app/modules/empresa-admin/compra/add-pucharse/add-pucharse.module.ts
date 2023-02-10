import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPucharseRoutingModule } from './add-pucharse-routing.module';
import { AddPucharseComponent } from './pages/add-pucharse/add-pucharse.component';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    AddPucharseComponent
  ],
  imports: [
    CommonModule,
    AddPucharseRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ListboxModule,
    AutoCompleteModule,
    ProgressBarModule,
    KeyFilterModule,
    MultiSelectModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    SliderModule,
    ButtonModule,
    BadgeModule,
    TabViewModule,
  ],
  exports:[
    AddPucharseComponent
  ]
})
export class AddPucharseModule { }
