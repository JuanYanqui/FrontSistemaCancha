import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register-pedido',
    loadChildren: () => import("./register-pedido/register-pedido.module").then(m => m.RegisterPedidoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientePedidoRoutingModule { }
