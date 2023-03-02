import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuComponent } from './pages/registro-usu/registro-usu.component';

const routes: Routes = [
    {
    path: '',
    component: RegistroUsuComponent
  }
]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarUsuariosRoutingModule { }
