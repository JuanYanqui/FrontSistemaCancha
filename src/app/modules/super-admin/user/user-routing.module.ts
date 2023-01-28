import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register-user',
    loadChildren: () => import("./reg-user/reg-user.module").then(m => m.RegUserModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import("./edit-user/edit-user.module").then(m => m.EditUserModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
