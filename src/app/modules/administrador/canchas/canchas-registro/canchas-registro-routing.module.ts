import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroCanchasComponent } from './pages/registro-canchas/registro-canchas.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroCanchasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanchasRegistroRoutingModule { }
