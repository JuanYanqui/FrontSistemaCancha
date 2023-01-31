import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from './pages/venta/venta.component';

const routes: Routes = [
  {
    path: '',
    component: VentaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaClienteRoutingModule { }
