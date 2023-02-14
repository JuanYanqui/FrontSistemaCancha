import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register-reclamo',
    loadChildren: () => import("./registrar-reclamos/registrar-reclamos.module").then(m => m.RegistrarReclamosModule)
  },
  {
    path: 'edit-reclamos',
    loadChildren: () => import("./edit-reclamos/edit-reclamos.module").then(m => m.EditReclamosModule)
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamosRoutingModule { }
