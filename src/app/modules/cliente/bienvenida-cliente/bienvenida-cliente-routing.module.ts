import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaClienteComponent } from './pages/bienvenida-cliente/bienvenida-cliente.component';
const routes: Routes = [
  {
    path:'',
    component:BienvenidaClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidaClienteRoutingModule { }
