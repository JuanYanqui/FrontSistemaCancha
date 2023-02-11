import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'register-establecimiento',
    loadChildren: () => import("./registrar-establecimiento/registrar-establecimiento.module").then(m => m.RegistrarEstablecimientoModule)
  },
  {
    path: 'edit-establecimiento',
    loadChildren: () => import("./edit-establecimiento/edit-establecimiento.module").then(m => m.EditEstablecimientoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstablecimientoRoutingModule { }
