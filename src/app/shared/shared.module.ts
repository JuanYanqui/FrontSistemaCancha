import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderlogComponent } from './components/headerlog/headerlog.component';
import { RouterModule } from '@angular/router';
import { CardgradientComponent } from './components/cardgradient/cardgradient.component';
import { SidebarEmpresaAdminComponent } from './components/sidebar-empresa-admin/sidebar-empresa-admin.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderlogComponent,
    CardgradientComponent,
    SidebarEmpresaAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    HeaderlogComponent,
    CardgradientComponent,
    SidebarEmpresaAdminComponent
  ]
})
export class SharedModule { }
