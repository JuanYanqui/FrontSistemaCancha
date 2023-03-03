import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAceptacionReservaComponent } from './pages/listar-aceptacion-reserva/listar-aceptacion-reserva.component';

const routes: Routes = [
  {
    path: '',
    component: ListarAceptacionReservaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarAceptacionReservaRoutingModule { }
