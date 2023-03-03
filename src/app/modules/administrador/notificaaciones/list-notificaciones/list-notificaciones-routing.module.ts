import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaNotificacionComponent } from './pages/lista-notificacion/lista-notificacion.component';

const routes: Routes = [
  {
    path: '',
    component: ListaNotificacionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListNotificacionesRoutingModule { }
