import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuproveedoresComponent } from './pages/menuproveedores/menuproveedores.component';

const routes: Routes = [
  {
    path:'',
    component: MenuproveedoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuProveedoresAdminRoutingModule { }
