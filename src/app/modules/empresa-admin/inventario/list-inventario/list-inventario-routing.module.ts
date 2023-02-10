import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInventariosComponent } from './pages/list-inventarios/list-inventarios.component';

const routes: Routes = [
  {
    path:'',
    component:ListInventariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListInventarioRoutingModule { }
