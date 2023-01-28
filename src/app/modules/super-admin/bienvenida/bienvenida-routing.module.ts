import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeClienteComponent } from '../../cliente/welcome-cliente/welcome-cliente.component';
import { BirenvenidalogComponent } from './pages/birenvenidalog/birenvenidalog.component';

const routes: Routes = [
  {
    path:'',
    component:BirenvenidalogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidaRoutingModule { }
