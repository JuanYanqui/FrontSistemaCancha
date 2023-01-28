import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenupedidosComponent } from './pages/menupedidos/menupedidos.component';

const routes: Routes = [
  {
    path:'',
    component:MenupedidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPedidosAdminRoutingModule { }
