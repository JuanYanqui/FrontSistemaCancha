import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroReclamoComponent } from './pages/registro-reclamo/registro-reclamo.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroReclamoComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarReclamosRoutingModule { }
