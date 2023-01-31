import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list-gestion-pedidos',
    loadChildren: () => import("./list-gestion-pedidos/list-gestion-pedidos.module").then(m => m.ListGestionPedidosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionPedidoRoutingModule { }
