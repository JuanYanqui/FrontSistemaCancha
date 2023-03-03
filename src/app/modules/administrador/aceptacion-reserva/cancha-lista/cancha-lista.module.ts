import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCanchaComponent } from './pages/lista-cancha/lista-cancha.component';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { CanchasListaRoutingModule } from './cancha-lista-routing.module';

@NgModule({
  declarations: [
    ListaCanchaComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    PanelModule,
    CanchasListaRoutingModule
  ]
})
export class CanchaListaModule { }
