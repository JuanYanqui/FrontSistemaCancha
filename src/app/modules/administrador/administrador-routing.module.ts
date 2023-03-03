import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bienvenida',
    loadChildren: () => import("./bienvenida-administrador/bienvenida-administrador.module").then(m => m.BienvenidaAdministradorModule)
  },
  {
    path: 'cancha',
    loadChildren: () => import("./canchas/canchas.module").then(m => m.CanchasModule)
  },
  {
    path: 'registrodamage',
    loadChildren: () => import("./damage/damage.module").then(m => m.DamageModule)
  },
  {
    path: 'aceptacion-reserva',
    loadChildren: () => import("./aceptacion-reserva/aceptacion-reserva.module").then(m => m.AceptacionReservaModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import("./notificaaciones/list-notificaciones/list-notificaciones.module").then(m => m.ListNotificacionesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
