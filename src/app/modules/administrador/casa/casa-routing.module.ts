import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasaComponent } from './pages/casa/casa.component';

const routes: Routes = [
  {
    path:'',
   component: CasaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasaRoutingModule { }
