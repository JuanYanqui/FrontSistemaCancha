import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroReservasComponent } from './pages/registro-reservas/registro-reservas.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroReservasComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroReservasRoutingModule { }
