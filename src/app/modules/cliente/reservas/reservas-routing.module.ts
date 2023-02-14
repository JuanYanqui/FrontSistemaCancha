import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register-reserva',
    loadChildren: () => import("./registro-reservas/registro-reservas.module").then(m => m.RegistroReservasModule)
  },
  // {
  //   path: 'edit-establecimiento',
  //   loadChildren: () => import("./edit-establecimiento/edit-establecimiento.module").then(m => m.EditEstablecimientoModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
