import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'register-servicio',
    loadChildren: () => import("./registrar-servicios/registrar-servicios.module").then(m => m.RegistrarServiciosModule)
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }
