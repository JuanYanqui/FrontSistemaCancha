import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenucompraComponent } from './pages/menucompra/menucompra.component';

const routes: Routes = [
  {
    path:'',
    component:MenucompraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuCompraAdminRoutingModule { }
