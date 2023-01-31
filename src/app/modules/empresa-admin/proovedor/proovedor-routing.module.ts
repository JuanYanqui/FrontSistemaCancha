import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'reg-proveedor',
    loadChildren: () => import("./register-proovedor/register-proovedor.module").then(m => m.RegisterProovedorModule)
  },

  {
    path: 'list-proveedor',
    loadChildren: () => import("./list-proovedor/list-proovedor.module").then(m => m.ListProovedorModule)
  },

  {
    path: 'edit-proveedor',
    loadChildren: () => import("./edit-proovedor/edit-proovedor.module").then(m => m.EditProovedorModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProovedorRoutingModule { }
