import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashCatalogoComponent } from './pages/dash-catalogo/dash-catalogo.component';

const routes: Routes = [
  {
    path: '',
    component: DashCatalogoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashCatalogoRoutingModule { }
