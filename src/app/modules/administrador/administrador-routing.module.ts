import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bienvenida',
    loadChildren: () => import("./bienvenida-administrador/bienvenida-administrador.module").then(m => m.BienvenidaAdministradorModule)
  },
  {
    path: 'casa',
    loadChildren: () => import("./casa/casa.module").then(m => m.CasaModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
