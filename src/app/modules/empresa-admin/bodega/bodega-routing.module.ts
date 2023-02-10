import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from 'path';

const routes: Routes = [
  {
    path: 'reg-bodega',
    loadChildren: () => import("./register-bodega/register-bodega.module").then(m => m.RegisterBodegaModule)
  },

  {
    path: 'list-bodega',
    loadChildren: () => import("./list-bodega/list-bodega.module").then(m => m.ListBodegaModule)
  },

  {
    path: 'edit-bodega',
    loadChildren: () => import("./edit-bodega/edit-bodega.module").then(m => m.EditBodegaModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodegaRoutingModule { }
