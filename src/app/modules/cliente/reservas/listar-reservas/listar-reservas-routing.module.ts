import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarReservasComponent } from './pages/listar-reservas/listar-reservas.component';

const routes: Routes = [
  {
    path: '',
    component: ListarReservasComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarReservasRoutingModule { }
