import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from 'path';
import { ListPucharseComponent } from './pages/list-pucharse/list-pucharse.component';

const routes: Routes = [
{
  path:'',
  component: ListPucharseComponent
}
]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPucharseRoutingModule { }
