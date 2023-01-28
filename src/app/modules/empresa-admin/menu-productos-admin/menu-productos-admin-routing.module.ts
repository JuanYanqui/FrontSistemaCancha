import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuproductoComponent } from './pages/menuproducto/menuproducto.component';

const routes: Routes = [
  {
    path:'',

    component:MenuproductoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuProductosAdminRoutingModule { }
