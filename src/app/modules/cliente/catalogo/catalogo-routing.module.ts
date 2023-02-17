import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'catalogo-canchas',
    loadChildren: () => import("./catalogo-canchas/catalogo-canchas.module").then(m => m.CatalogoCanchasModule)
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
