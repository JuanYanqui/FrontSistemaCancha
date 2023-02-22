import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCanchaComponent } from './pages/lista-cancha/lista-cancha.component';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { CanchasListaRoutingModule } from './cancha-lista-routing.module';
import { CanchasRegistroRoutingModule } from '../canchas-registro/canchas-registro-routing.module';

@NgModule({
  declarations: [
    ListaCanchaComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    PanelModule,
    CanchasListaRoutingModule,
    CanchasRegistroRoutingModule
  ]
})
export class CanchaListaModule { }
