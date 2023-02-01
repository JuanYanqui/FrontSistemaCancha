import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroReservaComponent } from './pages/registro-reserva/registro-reserva.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroReservaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarReservasRoutingModule { }
