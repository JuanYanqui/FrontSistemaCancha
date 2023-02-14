import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'reserva',
    loadChildren: () => import("./reservas/reservas.module").then(m => m.ReservasModule)
  }
  , {
    path: 'reclamo',
    loadChildren: () => import("./reclamos/reclamos-routing.module").then(m => m.ReclamosRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
