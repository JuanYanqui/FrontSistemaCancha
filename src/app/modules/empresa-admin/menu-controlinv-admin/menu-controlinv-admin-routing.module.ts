import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlinvComponent } from './pages/controlinv/controlinv.component';

const routes: Routes = [
  {
    path:'',
    component:ControlinvComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuControlinvAdminRoutingModule { }
