import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuSuperAdminUserComponent } from './pages/menu-super-admin-user/menu-super-admin-user.component';

const routes: Routes = [
  {
    path:'',
    component: MenuSuperAdminUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuSuperAdminUserRoutingModule { }
