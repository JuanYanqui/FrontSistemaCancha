import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register-cliente',
    loadChildren: () => import("./register-cliente/register-cliente.module").then(m => m.RegisterClienteModule)
  },
  {
    path: 'list-cliente',
    loadChildren: () => import("./list-cliente/list-cliente.module").then(m => m.ListClienteModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
