import { Component } from '@angular/core';
import { CargarscriptsService } from 'src/app/shared/services/cargarscripts.service';
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router';
@Component({
  selector: 'app-menureportes',
  templateUrl: './menureportes.component.html',
  styleUrls: ['./menureportes.component.css']
})
export class MenureportesComponent {
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
 
  this.router.navigate(['/empresa-adm/reportes/gestion-rep'])
  console.log($event)

 }
 selectedTabIndex = 1;
 selectTab(index: number) {
 this.selectedTabIndex = index;


}








}
