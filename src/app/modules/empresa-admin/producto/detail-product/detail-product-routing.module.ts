import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailprodComponent } from './pages/detailprod/detailprod.component';

const routes: Routes = [
  {
    path:'',
    component:DetailprodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailProductRoutingModule { }
