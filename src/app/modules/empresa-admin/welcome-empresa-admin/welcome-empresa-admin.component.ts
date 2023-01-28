import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CargarscriptsService } from 'src/app/shared/services/cargarscripts.service';

@Component({
  selector: 'app-welcome-empresa-admin',
  templateUrl: './welcome-empresa-admin.component.html',
  styleUrls: ['./welcome-empresa-admin.component.css']
})
export class WelcomeEmpresaAdminComponent {

  title = 'dinamic-styles';
  cssUrl: string;
  constructor(public sanitizer: DomSanitizer, private _CargarScripts: CargarscriptsService, private _Cargar: CargarscriptsService, private router: Router) {
    this.cssUrl = 'assets/css/swiper-bundle.min.css';
    {
      _CargarScripts.cargajs(["swiper-bundle.min"])

    }
    {
      _Cargar.carga(["scriptCard"])

    }

  }
}
