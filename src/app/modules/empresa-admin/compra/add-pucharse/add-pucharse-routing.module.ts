import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPucharseComponent } from './pages/add-pucharse/add-pucharse.component';

const routes: Routes = [
  {
    path:'',
    component: AddPucharseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPucharseRoutingModule { }
