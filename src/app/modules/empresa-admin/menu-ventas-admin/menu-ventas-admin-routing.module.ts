import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuventasComponent } from './pages/menuventas/menuventas.component';

const routes: Routes = [
  {
    path:'',
    component: MenuventasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuVentasAdminRoutingModule { }
