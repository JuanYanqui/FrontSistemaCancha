import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardEmpresaAdminComponent } from './page/dashboard-empresa-admin/dashboard-empresa-admin.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardEmpresaAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardEmpresaAdminRoutingModule { }
