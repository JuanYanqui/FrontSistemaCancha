import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPedidoComponent } from './pages/register-pedido/register-pedido.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterPedidoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterPedidoRoutingModule { }
