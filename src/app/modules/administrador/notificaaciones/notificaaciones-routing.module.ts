import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'notificacion',
        loadChildren: () => import("./list-notificaciones/list-notificaciones-routing.module").then(m => m.ListNotificacionesRoutingModule)
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificaacionesRoutingModule { }
