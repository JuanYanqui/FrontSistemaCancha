import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoAdministradorComponent } from './pages/bienvenido-administrador/bienvenido-administrador.component';

const routes: Routes = [
  {
    path:'',
   component: BienvenidoAdministradorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidaAdministradorRoutingModule { }
