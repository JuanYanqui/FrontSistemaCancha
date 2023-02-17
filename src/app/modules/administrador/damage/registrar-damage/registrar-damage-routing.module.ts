import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroDamageComponent } from './pages/registro-damage/registro-damage.component';

const routes: Routes = [
  {
    path: '',
    component: RegistroDamageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarDamageRoutingModule { }
