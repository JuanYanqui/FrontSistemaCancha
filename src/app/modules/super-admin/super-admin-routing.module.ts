import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'empresa',
    loadChildren: () => import("./empresa/empresa.module").then(m => m.EmpresaModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import("./user/user.module").then(m => m.UserModule)
  },
  {
    path: 'menu-spradmin-emp',
    loadChildren: () => import("./menu-spradmin/menu-spradmin.module").then(m => m.MenuSpradminModule)
  },
  {
    path: 'menu-spradmin-usr',
    loadChildren: () => import("./menu-super-admin-user/menu-super-admin-user.module").then(m => m.MenuSuperAdminUserModule)
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
