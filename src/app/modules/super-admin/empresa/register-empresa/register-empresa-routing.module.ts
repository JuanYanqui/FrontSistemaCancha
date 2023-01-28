import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterEmpresaComponent } from './pages/register-empresa/register-empresa.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterEmpresaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterEmpresaRoutingModule { }
