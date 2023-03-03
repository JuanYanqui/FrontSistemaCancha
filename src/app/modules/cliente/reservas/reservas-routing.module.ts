import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register-reserva',
    loadChildren: () => import("./registro-reservas/registro-reservas.module").then(m => m.RegistroReservasModule)
  },
  {
    path: 'listar-reserva',
    loadChildren: () => import("./listar-reservas/listar-reservas.module").then(m => m.ListarReservasModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
