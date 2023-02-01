import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarEstablecimientoComponent } from './pages/registrar-establecimiento/registrar-establecimiento.component';


const routes: Routes = [
  {
    path: '',
    component: RegistrarEstablecimientoComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarEstablecimientoRoutingModule { }
