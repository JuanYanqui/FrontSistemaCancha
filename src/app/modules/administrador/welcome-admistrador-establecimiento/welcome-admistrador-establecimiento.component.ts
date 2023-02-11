import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CargarscriptsService } from 'src/app/shared/services/cargarscripts.service';

@Component({
  selector: 'app-welcome-admistrador-establecimiento',
  templateUrl: './welcome-admistrador-establecimiento.component.html',
  styleUrls: ['./welcome-admistrador-establecimiento.component.css']
})
export class WelcomeAdmistradorEstablecimientoComponent {

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
