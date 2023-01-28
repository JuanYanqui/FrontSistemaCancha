import { Component } from '@angular/core';
import { CargarscriptsService } from 'src/app/shared/services/cargarscripts.service';
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router';
@Component({
  selector: 'app-menupersonal',
  templateUrl: './menupersonal.component.html',
  styleUrls: ['./menupersonal.component.css']
})
export class MenupersonalComponent {
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
 
  this.router.navigate(['/empresa-adm/personal/register-personal'])
  console.log($event)

 }
 selectedTabIndex = 1;
 selectTab(index: number) {
 this.selectedTabIndex = index;


}
goTo($event: any) :void{

 
  this.router.navigate(['/empresa-adm/personal/edit-personal'])
  console.log($event)

  this.selectTab


 }

 goT($event: any) :void{

 
  this.router.navigate(['/empresa-adm/personal/list-personal'])
  console.log($event)

  this.selectTab


 }





}
