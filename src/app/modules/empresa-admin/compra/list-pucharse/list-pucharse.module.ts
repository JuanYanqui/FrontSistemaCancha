import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPucharseRoutingModule } from './list-pucharse-routing.module';
import { ListPucharseComponent } from './pages/list-pucharse/list-pucharse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListboxModule } from 'primeng/listbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressBarModule } from 'primeng/progressbar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [
    ListPucharseComponent
  ],
  imports: [
    CommonModule,
    ListPucharseRoutingModule,
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
    ListPucharseComponent
  ]
})
export class ListPucharseModule { }
