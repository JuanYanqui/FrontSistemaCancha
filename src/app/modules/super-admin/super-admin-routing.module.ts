import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'empresa',
    loadChildren: () => import("./empresa/empresa.module").then(m => m.EmpresaModule)
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
    path: 'usuario',
    loadChildren: () => import("./user/user.module").then(m => m.UserModule)
  },
  {
    path: 'menu-spradmin-emp',
    loadChildren: () => import("./menu-spradmin/menu-spradmin.module").then(m => m.MenuSpradminModule)
  },
  {
    path: '',
    loadChildren: () => import("./bienvenida/bienvenida.module").then(m => m.BienvenidaModule)
  },

  {
    path: 'servicio',
    loadChildren: () => import("./servicio/servicio.module").then(m => m.ServicioModule)
  },
  {
    path: 'damage',
    loadChildren: () => import("./damage/damage.module").then(m => m.DamageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
