import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterProveedorComponent } from './pages/register-proveedor/register-proveedor.component';

const routes: Routes = [
  {
    path:'',
    component:RegisterProveedorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterProovedorRoutingModule { }
