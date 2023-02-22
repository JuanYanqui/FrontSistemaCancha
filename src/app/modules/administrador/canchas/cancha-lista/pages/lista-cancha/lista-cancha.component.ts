import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { EstablecimientoService } from 'src/app/shared/services/establecimiento.service';
import { FotoService } from 'src/app/shared/services/foto.service';

@Component({
  selector: 'app-lista-cancha',
  templateUrl: './lista-cancha.component.html',
  styleUrls: ['./lista-cancha.component.css']
})
export class ListaCanchaComponent {
  dataEst: any;
  id_personaIsLoggin:any;
  establecimiento:Establecimiento=new Establecimiento;
  constructor(private cargarScripts: CargarScriptsService, private toastr: ToastrService, private fotoService: FotoService, private establecimientoService: EstablecimientoService, private canchasService: CanchasService, private router: Router) {
    cargarScripts.Carga(["lista-cancha.component"])
  }

ngOnInit():void{
  this.id_personaIsLoggin = localStorage.getItem('localIdPersona');
  this.obtenerEst();
  
  
}

listaEstablecimineto: Establecimiento[] = [];

obtenerEst() {
  this.establecimientoService.getListarEst(this.id_personaIsLoggin).subscribe(
    data => {
      this.listaEstablecimineto = data.map(
        result => {
          let e = new Establecimiento;
          e.idEstablecimiento=result.idEstablecimiento;
          e.fotoestablecimiento=result.fotoestablecimiento;
          e.nombre=result.nombre;
          return e;
        }
      );
     }
    )
  }



capParaEdicion(idEstablecimiento: any) {
  this.dataEst = idEstablecimiento;
  localStorage.setItem("EstablecimientoID", String(this.dataEst));
  console.log("idEstablecimiento " + idEstablecimiento)
  }

}
