import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { Pago_Reserva } from 'src/app/core/models/pago_reserva';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { DisponibilidadService } from 'src/app/shared/services/disponibilidad.service';
import { EstablecimientoService } from 'src/app/shared/services/establecimiento.service';
import { FotoService } from 'src/app/shared/services/foto.service';
import { Pago_ReservaServicio } from 'src/app/shared/services/pago_reserva.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { ReservaService } from 'src/app/shared/services/reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-aceptacion-reserva',
  templateUrl: './listar-aceptacion-reserva.component.html',
  styleUrls: ['./listar-aceptacion-reserva.component.css', './listar-aceptacion-reserva.component.scss']
})
export class ListarAceptacionReservaComponent {
  displayEU: Boolean =false;
  constructor(private fotoService: FotoService, private cargarScripts: CargarScriptsService, private pagoreservaService: Pago_ReservaServicio, private establecimientoService: EstablecimientoService, private canchaService: CanchasService, private reservaService: ReservaService, private disponibilidadservice: DisponibilidadService, private toastr: ToastrService, private personaservice: PersonaService) {
    this.obtenerEstid(); 
    cargarScripts.Carga(["visual"])
  }
  idEsta: any;
  Estadatos: any;
  ide:any;
  obtenerEstid() {
    this.idEsta = localStorage.getItem("EstablecimientoID");
    this.establecimientoService.getPorId(this.idEsta).subscribe(data => {
      this.Estadatos = data;
      this.ide = data.idEstablecimiento;
      this.obtenerPagos();
    })
  }

  listapagos:any;
  obtenerPagos(){
    this.pagoreservaService.Pagosporestablecimiento(this.ide).subscribe(data =>{
      this.listapagos = data;
    })
  }

  cancelarPago(idPago: number) {
    Swal.fire({
      title: 'Estas seguro de eliminar tu reserva?',
      text: "Se borraran todos tus datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Reserva Cancelada',
          'Se borraron todos sus datos',
          'success'
        )
  
        this.pagoreservaService.deletePagoReserva(idPago).subscribe({
  
        });
      }
    })
  }

  pagoSeleccionado: Pago_Reserva | undefined;

abrirdatos(pago: Pago_Reserva){
this.pagoSeleccionado = pago;
this.displayEU = true;
}

abrir(pago: Pago_Reserva){
  pago.estadopago = "RESERVADO";
  this.pagoreservaService.updatePagoReserva(pago, pago.idPagoReserva).subscribe({
    
  })
  this.displayEU =false;
}

cancelar(){
  this.displayEU =false;
}



}
