import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenupersonalComponent } from './pages/menupersonal/menupersonal.component';

const routes: Routes = [
  {
    path:'',
    component: MenupersonalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPersonalAdminRoutingModule { }
