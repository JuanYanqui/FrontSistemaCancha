import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAceptacionReservaComponent } from './listar-aceptacion-reserva/pages/listar-aceptacion-reserva/listar-aceptacion-reserva.component';

const routes: Routes = [
  {
    path: 'listar-reserva',
    loadChildren: () => import("./listar-aceptacion-reserva/listar-aceptacion-reserva.module").then(m => m.ListarAceptacionReservaModule)
  },
  {
    path: 'lista-establecimiento',
    loadChildren: () => import("./cancha-lista/cancha-lista.module").then(m => m.CanchaListaModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AceptacionReservaRoutingModule { }
