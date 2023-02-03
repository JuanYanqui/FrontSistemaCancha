import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuariosComponent } from './pages/registro-usuarios/registro-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroUsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarUsuariosRoutingModule { }
