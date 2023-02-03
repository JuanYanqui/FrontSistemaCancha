import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register-usuarioadmin',
    loadChildren: () => import("./registrar-usuarios/registrar-usuarios.module").then(m => m.RegistrarUsuariosModule)
  },
  {
    path: 'edit-usuarioadmin',
    loadChildren: () => import("./edit-usuarios/edit-usuarios.module").then(m => m.EditUsuariosModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioadminRoutingModule { }
