import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaAdminEmpComponent } from './pages/bienvenida-admin-emp/bienvenida-admin-emp.component';

const routes: Routes = [
  {
    path:'',
   component: BienvenidaAdminEmpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidaAdminEmpRoutingModule { }
