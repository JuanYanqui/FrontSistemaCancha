import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProveedorComponent } from './pages/edit-proveedor/edit-proveedor.component';

const routes: Routes = [
  {
    path:'',
    component:EditProveedorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProovedorRoutingModule { }
