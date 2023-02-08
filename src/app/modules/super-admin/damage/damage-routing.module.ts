import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register-damage',
    loadChildren: () => import("./registrar-damage/registrar-damage.module").then(m => m.RegistrarDamageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DamageRoutingModule { }
