import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'catalogo',
    loadChildren: () => import("./catalogo/catalogo.module").then(m => m.CatalogoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitadoRoutingModule { }
