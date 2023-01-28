import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenureportesComponent } from './pages/menureportes/menureportes.component';

const routes: Routes = [
  {
    path:'',
    component:MenureportesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuReportesAdminRoutingModule { }
