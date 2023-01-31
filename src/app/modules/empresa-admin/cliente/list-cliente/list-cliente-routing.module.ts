import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClienteComponent } from './pages/list-cliente/list-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ListClienteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListClienteRoutingModule { }
