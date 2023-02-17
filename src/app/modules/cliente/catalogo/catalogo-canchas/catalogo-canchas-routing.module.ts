import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoCanchasComponent } from './pages/catalogo-canchas/catalogo-canchas.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogoCanchasComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoCanchasRoutingModule { }
