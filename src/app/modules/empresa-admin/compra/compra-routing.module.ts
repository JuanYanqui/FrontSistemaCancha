import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add-pucharse',
    loadChildren: () => import("./add-pucharse/add-pucharse.module").then(m => m.AddPucharseModule)
  },
  {
    path: 'list-pucharse',
    loadChildren: () => import("./list-pucharse/list-pucharse.module").then(m => m.ListPucharseModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }
