import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarCanchasComponent } from './pages/editar-canchas/editar-canchas.component';

const routes: Routes = [
  {
    path: '',
    component: EditarCanchasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanchasEditarRoutingModule { }
