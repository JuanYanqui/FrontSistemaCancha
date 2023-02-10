import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoEmpComponent } from './page/catalogo-emp/catalogo-emp.component';

const routes: Routes = [
  {
    path:'',
    component:CatalogoEmpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
