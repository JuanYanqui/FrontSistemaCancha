import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeAdmistradorEstablecimientoComponent } from './modules/administrador/welcome-admistrador-establecimiento/welcome-admistrador-establecimiento.component';
import { WelcomeClienteComponent } from './modules/cliente/welcome-cliente/welcome-cliente.component';
import { WelcomeHomeComponent } from './modules/home/welcome-home/welcome-home.component';

import { WelcomeSuperadminComponent } from './modules/super-admin/welcome-superadmin/welcome-superadmin.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeHomeComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) // se importa un modulo que tiene routing es decir ruta 

  },
  {
    path: 'cliente',
    component: WelcomeClienteComponent,
    loadChildren: () => import('./modules/cliente/cliente.module').then(m => m.ClienteModule) // se importa un modulo que tiene routing es decir ruta 

  },
  {
    path: 'sup-admin',
    component: WelcomeSuperadminComponent,
    loadChildren: () => import('./modules/super-admin/super-admin.module').then(m => m.SuperAdminModule) // se importa un modulo que tiene routing es decir ruta 
  },
  {
    path: 'cliente',
    component: WelcomeClienteComponent,
    loadChildren: () => import('./modules/cliente/cliente.module').then(m => m.ClienteModule) // se importa un modulo que tiene routing es decir ruta 
  },
  {
    path: 'adminsitrador',
    component: WelcomeAdmistradorEstablecimientoComponent,
    loadChildren: () => import('./modules/administrador/administrador.module').then(m => m.AdministradorModule) // se importa un modulo que tiene routing es decir ruta 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
