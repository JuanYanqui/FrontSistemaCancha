import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register-reclamo',
    loadChildren: () => import("./registrar-reclamos/registrar-reclamos.module").then(m => m.RegistrarReclamosModule)
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamosRoutingModule { }
