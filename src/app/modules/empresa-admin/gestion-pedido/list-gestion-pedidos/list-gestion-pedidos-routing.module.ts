import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGestionPedidosComponent } from './pages/list-gestion-pedidos/list-gestion-pedidos.component';

const routes: Routes = [
  {
    path:'',
    component:ListGestionPedidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListGestionPedidosRoutingModule { }
