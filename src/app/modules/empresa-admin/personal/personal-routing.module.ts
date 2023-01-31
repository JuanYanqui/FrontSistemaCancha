import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'register-personal',
    loadChildren: () => import("./register-personal/register-personal.module").then(m => m.RegisterPersonalModule)
  },
  {
    path: 'list-personal',
    loadChildren: () => import("./list-personal/list-personal.module").then(m => m.ListPersonalModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
