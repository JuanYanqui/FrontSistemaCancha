import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterProductoComponent } from './pages/register-producto/register-producto.component';

const routes: Routes = [
  {
    path:'',
    component:RegisterProductoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterProductoRoutingModule { }
