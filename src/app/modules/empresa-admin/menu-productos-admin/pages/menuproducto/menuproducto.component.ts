import { Component } from '@angular/core';
import { CargarscriptsService } from 'src/app/shared/services/cargarscripts.service';
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuproducto',
  templateUrl: './menuproducto.component.html',
  styleUrls: ['./menuproducto.component.css']
})
export class MenuproductoComponent {
  title = 'dinamic-styles';
  cssUrl: string;
  constructor(public sanitizer: DomSanitizer , private _CargarScripts:CargarscriptsService , private _Cargar:CargarscriptsService,private router : Router  ) {
    this.cssUrl = 'assets/css/swiper-bundle.min.css';
    {
      _CargarScripts.cargajs(["swiper-bundle.min"])

     }
     {
      _Cargar.carga(["scriptCard"])

     }
     
  }
  
ngOnInit(): void {
}

goToR($event: any) :void{
 
  this.router.navigate(['/empresa-adm/producto/register-product'])
  console.log($event)

 }
 selectedTabIndex = 1;
 selectTab(index: number) {
 this.selectedTabIndex = index;


}
goTo($event: any) :void{
 
  this.router.navigate(['/sup-admin/usuario/edit-user'])
  console.log($event)

  this.selectTab


 }



go($event: any) :void{
 
  this.router.navigate(['/empresa-adm/producto/catalogo'])
  console.log($event)

 }


}
