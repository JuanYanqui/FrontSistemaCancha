import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProveedorComponent } from './pages/list-proveedor/list-proveedor.component';

const routes: Routes = [
  {
    path:'',
    component:ListProveedorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProovedorRoutingModule { }
