import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBodegaComponent } from './pages/list-bodega/list-bodega.component';

const routes: Routes = [ {
  path:'',
  component:ListBodegaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBodegaRoutingModule { }
