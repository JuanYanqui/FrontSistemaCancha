import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'cliente-pedido',
  //   loadChildren: () => import("./cliente-pedido/cliente-pedido.module").then(m => m.ClientePedidoModule)
  // }
  // , {
  //   path: 'cliente-producto',
  //   loadChildren: () => import("./cliente-producto/cliente-producto.module").then(m => m.ClienteProductoModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
