import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:() => import("./homepage/homepage.module").then(m => m.HomepageModule)
  } 
  ,
  {
    path:'register-usr',
    loadChildren:() => import("./register-user/register-user.module").then(m => m.RegisterUserModule)
  },
  {
    path:'login-usr',
    loadChildren:() => import("./auth/auth.module").then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
