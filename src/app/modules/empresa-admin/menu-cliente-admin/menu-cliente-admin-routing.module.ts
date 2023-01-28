import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuClienteComponent } from './pages/menu-cliente/menu-cliente.component';

const routes: Routes = [
  {
    path:'',
    component: MenuClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuClienteAdminRoutingModule { }
