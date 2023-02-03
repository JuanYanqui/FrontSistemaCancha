import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUsuariosComponent } from './pages/edit-usuarios/edit-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: EditUsuariosComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUsuariosRoutingModule { }
