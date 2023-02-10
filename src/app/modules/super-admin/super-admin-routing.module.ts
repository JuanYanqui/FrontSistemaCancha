import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'menu-spradmin-emp',
    loadChildren: () => import("./menu-spradmin/menu-spradmin.module").then(m => m.MenuSpradminModule)
  },
  {
    path: 'menu-spradmin-usr',
    loadChildren: () => import("./menu-super-admin-user/menu-super-admin-user.module").then(m => m.MenuSuperAdminUserModule)
  },
  {
    path: 'usuarioadmin',
    loadChildren: () => import("./usuarioadmin/usuarioadmin.module").then(m => m.UsuarioadminModule)
  },
  {
    path: 'establecimiento',
    loadChildren: () => import("./establecimiento/establecimiento.module").then(m => m.EstablecimientoModule)
  },
   {
    path: 'bienvenida',
    loadChildren: () => import("./bienvenida/bienvenida.module").then(m => m.BienvenidaModule)
  },  
  {
    path: 'bienvenida',
    loadChildren: () => import("./bienvenida/bienvenida.module").then(m => m.BienvenidaModule)
  },
  
  {
    path: '',
    loadChildren: () => import("./bienvenida/bienvenida.module").then(m => m.BienvenidaModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
