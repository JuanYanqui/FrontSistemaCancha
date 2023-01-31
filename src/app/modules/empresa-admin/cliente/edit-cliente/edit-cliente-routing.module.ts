import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditClienteComponent } from './pages/edit-cliente/edit-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: EditClienteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditClienteRoutingModule { }
