import { Component } from '@angular/core';
import { CargarscriptsService } from 'src/app/shared/services/cargarscripts.service';

@Component({
  selector: 'app-dashboard-empresa-admin',
  templateUrl: './dashboard-empresa-admin.component.html',
  styleUrls: ['./dashboard-empresa-admin.component.css']
})
export class DashboardEmpresaAdminComponent {
  constructor( private _Cargar :CargarscriptsService ){
    {
      _Cargar.carga(["dashboard"])
     
      
    }

}
}
