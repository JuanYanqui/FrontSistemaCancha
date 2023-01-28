import { Component, OnInit } from '@angular/core';
import { CargarscriptsService } from 'src/app/shared/services/cargarscripts.service';
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router';
@Component({
  selector: 'app-menuspradmin',
  templateUrl: './menuspradmin.component.html',
  styleUrls: ['./menuspradmin.component.css']
})
export class MenuspradminComponent implements OnInit {
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
 
  this.router.navigate(['/sup-admin/empresa/register-empresa'])
  console.log($event)

 }
 selectedTabIndex = 1;
 selectTab(index: number) {
 this.selectedTabIndex = index;


}
goTo($event: any) :void{
 
  this.router.navigate(['/sup-admin/empresa/edit-empresa'])
  console.log($event)

  this.selectTab


 }


goT($event: any) :void{
 
  this.router.navigate(['/sup-admin/usuario/edit-empresa'])
  console.log($event)

 }

go($event: any) :void{
 
  this.router.navigate(['/sup-admin/empresa/edit-user'])
  console.log($event)

 }






}
