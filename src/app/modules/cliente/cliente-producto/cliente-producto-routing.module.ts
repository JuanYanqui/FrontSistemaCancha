import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'catalogo-productos',
    loadChildren: () => import("./catalogo-productos/catalogo-productos.module").then(m => m.CatalogoProductosModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteProductoRoutingModule { }
