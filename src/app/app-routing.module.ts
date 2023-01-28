import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: 'empresa-adm',
    component: WelcomeSuperadminComponent,
    loadChildren: () => import('./modules/empresa-admin/empresa-admin.module').then(m => m.EmpresaAdminModule) // se importa un modulo que tiene routing es decir ruta 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }