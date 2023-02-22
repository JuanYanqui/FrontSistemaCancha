import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCanchaComponent } from './pages/lista-cancha/lista-cancha.component';


const routes: Routes = [
  {
    path: '',
    component: ListaCanchaComponent


    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanchasListaRoutingModule { }