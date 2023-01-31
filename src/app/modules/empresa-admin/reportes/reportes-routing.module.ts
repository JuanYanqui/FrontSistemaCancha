import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportesModule } from './reportes.module';

const routes: Routes = [
  {
    path: 'gestion-rep',
    loadChildren: () => import("./gestion-rep/gestion-rep.module").then(m => m.GestionRepModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
