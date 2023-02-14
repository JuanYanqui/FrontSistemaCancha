import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditReclamosComponent } from './pages/edit-reclamos/edit-reclamos.component';

const routes: Routes = [
  {
    path: '',
    component: EditReclamosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditReclamosRoutingModule { }
