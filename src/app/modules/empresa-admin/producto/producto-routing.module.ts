import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'catalogo',
    loadChildren: () => import("./catalogo/catalogo.module").then(m => m.CatalogoModule)
  },
  {
    path: 'register-product',
    loadChildren: () => import("./register-producto/register-producto.module").then(m => m.RegisterProductoModule)
  },
  {
    path: 'detalle-producto/:id',
    loadChildren: () => import("./detail-product/detail-product.module").then(m => m.DetailProductModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
