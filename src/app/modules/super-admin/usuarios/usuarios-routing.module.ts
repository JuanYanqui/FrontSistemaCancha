import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'registrar-usuarios',
    loadChildren: () => import("./registrar-usuarios/registrar-usuarios.module").then(m => m.RegistrarUsuariosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
