import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDamageComponent } from './pages/lista-damage/lista-damage.component';

const routes: Routes = [
  {
    path:'',
    component:ListaDamageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaDamageRoutingModule { }
