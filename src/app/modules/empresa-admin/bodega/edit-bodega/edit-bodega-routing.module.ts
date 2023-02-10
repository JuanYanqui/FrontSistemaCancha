import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBodegaComponent } from './pages/edit-bodega/edit-bodega.component';

const routes: Routes = [{ 
  path:'',
  component:EditBodegaComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBodegaRoutingModule { }
