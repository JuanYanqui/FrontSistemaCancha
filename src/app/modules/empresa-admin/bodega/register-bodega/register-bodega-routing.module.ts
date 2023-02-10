import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterBodegaComponent } from './pages/register-bodega/register-bodega.component';

const routes: Routes = [ {
  path:'',
  component:RegisterBodegaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterBodegaRoutingModule { }
