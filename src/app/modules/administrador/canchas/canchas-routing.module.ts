import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'registro-canchas',
    loadChildren: () => import("./canchas-registro/canchas-registro.module").then(m => m.CanchasRegistroModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanchasRoutingModule { }
