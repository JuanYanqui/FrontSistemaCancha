import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroServiciosComponent } from './pages/registro-servicios/registro-servicios.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroServiciosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarServiciosRoutingModule { }
