import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoProductsComponent } from './pages/catalogo-products/catalogo-products.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogoProductsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoProductosRoutingModule { }
