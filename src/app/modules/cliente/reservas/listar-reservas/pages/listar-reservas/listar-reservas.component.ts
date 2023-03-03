import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { Disponibilidad } from 'src/app/core/models/disponibilidad';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { DisponibilidadService } from 'src/app/shared/services/disponibilidad.service';
import { EstablecimientoService } from 'src/app/shared/services/establecimiento.service';
import { FotoService } from 'src/app/shared/services/foto.service';
import { Pago_ReservaServicio } from 'src/app/shared/services/pago_reserva.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { ReservaService } from 'src/app/shared/services/reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.css','./listar-reservas.component.scss']
})
export class ListarReservasComponent {
disponibilidad:Disponibilidad= new Disponibilidad;
estadoif:boolean = false;

  constructor(private fotoService: FotoService, private cargarScripts: CargarScriptsService,private pagoreservaService: Pago_ReservaServicio, private establecimientoService: EstablecimientoService, private canchaService: CanchasService, private reservaService: ReservaService, private disponibilidadservice: DisponibilidadService, private toastr: ToastrService, private personaservice: PersonaService) {
    this.obtenercliente();
  }
  idcli:any;
  datocli: any;
  datocliente:any;
  obtenercliente() {
    this.idcli = localStorage.getItem("localIdPersona");
    this.personaservice.getPorId(this.idcli).subscribe(data => {
      this.datocliente = data;
      console.log(data);
      this.datocli = data.idPersona;
      this.obtenerreservas();
    });
  }
idresera:any;
listapago:any;
listapagos:any;

obtenerreservas() {
  this.pagoreservaService.Reservasporpago(this.datocli).subscribe(data => {
    this.listapagos = data; // assign data to the array
    console.log(data);

    // loop through each reservation and get its payment information
  });
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

}
