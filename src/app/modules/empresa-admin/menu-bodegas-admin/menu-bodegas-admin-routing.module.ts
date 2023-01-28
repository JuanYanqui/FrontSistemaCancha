import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenubodegasComponent } from './pages/menubodegas/menubodegas.component';

const routes: Routes = [
  {
  path:'',
  component: MenubodegasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuBodegasAdminRoutingModule { }
