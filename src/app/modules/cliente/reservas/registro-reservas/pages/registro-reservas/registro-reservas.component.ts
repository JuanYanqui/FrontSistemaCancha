import { CargarScriptsService } from 'src/app/cargar-scripts.service';

import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventSourceInput } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Reserva } from 'src/app/core/models/reserva';
import { ReservaService } from 'src/app/shared/services/reserva.service';
import { Disponibilidad } from 'src/app/core/models/disponibilidad';
import { DisponibilidadService } from 'src/app/shared/services/disponibilidad.service';
import { ToastrService } from 'ngx-toastr';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { EstablecimientoService } from 'src/app/shared/services/establecimiento.service';
import Swal from 'sweetalert2';
import { Pago_ReservaServicio } from 'src/app/shared/services/pago_reserva.service';
import { Pago_Reserva } from 'src/app/core/models/pago_reserva';
import { FotoService } from 'src/app/shared/services/foto.service';
declare var require: any
const moment = require('moment');
@Component({
  selector: 'app-registro-reservas',
  templateUrl: './registro-reservas.component.html',
  styleUrls: ['./registro-reservas.component.css']
})
export class RegistroReservasComponent {


  calendarOptions: any;
  displayEU: boolean = false;
  displayEU2: boolean = false;
  reserva: Reserva = new Reserva;
  idcanchas: any;
  disponibilidad: Disponibilidad = new Disponibilidad;
  listadisponibilidad: any[] = [];
  datocancha: any;
  idcli: any;
  datocliente: any;
  obtenciondatadispo: any;
  obtenhora: any;
  obtenfecha: any;
  obtenidcancha: [] = [];
  canchaelegida: any;
  horas!: string[];
  horaSeleccionada!: string;
  fechaD: Date = new Date;
  HoraD!: number;
  nombreestablecimiento:any;
  isButtonEnabled2: boolean = false;
  pago_reserva: Pago_Reserva = new Pago_Reserva;

  constructor(private fotoService: FotoService, private cargarScripts: CargarScriptsService,private pagoreservaService: Pago_ReservaServicio, private establecimientoService: EstablecimientoService, private canchaService: CanchasService, private reservaService: ReservaService, private disponibilidadservice: DisponibilidadService, private toastr: ToastrService, private personaservice: PersonaService) {
    this.obtenercancha();
    this.obtenercliente();
    this.capestable = localStorage.getItem("idEstablecimiento");
    this.establecimientoService.getPorId(this.capestable).subscribe(data => {
      this.veresta = data;
      this.horaApetura = data.horaApertura;
      console.log(this.horaApetura);
      this.horaCierre = data.horaCierre;
      console.log(this.horaCierre);
      console.log(this.veresta);
      this.nombreestablecimiento = data.nombre;



      this.horaApetura; // La hora en formato de cadena
      const [hora, minuto, segundo] = this.horaApetura.split(':'); // Dividimos la cadena en horas, minutos y segundos
      const horasEnterasA = parseInt(hora); // Convertimos las horas en un número entero
      console.log(horasEnterasA); // Output: 23

      this.horaCierre; // La hora en formato de cadena
      const [horas, minutos, segundos] = this.horaCierre.split(':'); // Dividimos la cadena en horas, minutos y segundos
      const horasEnteras = parseInt(horas); // Convertimos las horas en un número entero
      console.log(horasEnteras); // Output: 23

      const horaInicial = moment({ hour: horasEnterasA, minute: 0 });
      const horaFinal = moment({ hour: horasEnteras + 1, minute: 0 });
      this.horas = [];
      while (horaInicial.isBefore(horaFinal)) {
        this.horas.push(horaInicial.format('HH:mm A'));
        horaInicial.add(60, 'minutes');
      }

      this.horaSeleccionada = horaInicial;

    });
  

    cargarScripts.Carga(["boton"]);
  }



  extraerHora(hora: string): number {
    return parseInt(hora.split(':')[0]);
  }

  horaobtenida!: any;
  guardarHoraSeleccionada(): void {
    let horaNumerica = this.extraerHora(this.horaSeleccionada);
    console.log('Hora seleccionada:', horaNumerica);
    this.disponibilidad.hora = horaNumerica;
    this.horaobtenida = horaNumerica;
    // aquí puedes hacer cualquier cosa con la hora seleccionada, como asignarla a otra variable
  }

  datocli: any;
  obtenercliente() {
    this.idcli = localStorage.getItem("localIdPersona");
    this.personaservice.getPorId(this.idcli).subscribe(data => {
      this.datocliente = data;
      console.log(data);
      this.datocli = data.idPersona;
    });
  }
  capestable: any;
  veresta: any;
  horaApetura: any;
  horaCierre: any;

  nombrecancha: any;
  costocan:any;
  obtenercancha() {
    this.idcanchas = localStorage.getItem("idCancha");
    console.log(this.idcanchas);
    this.canchaService.getPorId(this.idcanchas).subscribe(data => {
      this.datocancha = data;
      console.log(this.datocancha);
      this.canchaelegida = this.datocancha.idCancha
      this.nombrecancha = data.nombre;
      this.costocan = data.tarifa;

    })
  }

  formatoFecha(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    return `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
  }

  datosdis: any;
  dataid: any;
  datarese: any;
  fechaSeleccionada: any


  disponibilidades: Disponibilidad[] = [];
  fechaformateada: any;
  fechaescojida: any;
  guardarreserva() {
 
    this.disponibilidad.cancha = this.datocancha;
    this.disponibilidad.estado = true;
    const fecha = new Date(this.fechaescojida);
    this.fechaformateada = fecha.toISOString().slice(0, 10);
    let horaNumerica = this.extraerHora(this.horaSeleccionada);
    console.log('Hora seleccionada:', horaNumerica);
    this.disponibilidad.hora = horaNumerica;
    this.horaobtenida = horaNumerica;
    this.disponibilidadservice.verficarRegistro(this.fechaformateada, this.horaobtenida, this.canchaelegida).subscribe(data => {
      if(this.disponibilidad.estado == true){
      if (!data) {
        this.disponibilidad.fecha = this.fechaformateada;
        console.log(this.disponibilidad);
        this.disponibilidadservice.postDisponibilidad(this.disponibilidad).subscribe(data => {
          // Obtener la disponibilidad creada
          const disponibilidadCreada = data;
          // Agregar la disponibilidad a la lista de disponibilidades
          this.disponibilidades.push(disponibilidadCreada);
          // Preguntar al usuario si desea agregar otra disponibilidad


          Swal.fire({
            title: 'Desea ingresar otra  fecha y hora',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Continuar!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.disponibilidad = new Disponibilidad();
              this.disponibilidad.cancha = this.datocancha;
              this.disponibilidad.estado = true;
              Swal.fire(
                'PROCESO',
                'CON EXITO',
                'success'
              )
            } else {
              this.crearReserva();
            }
          })
        });
      } else {
        this.toastr.error("Fechas no disponibles");
      }
    }else{
      this.disponibilidad.fecha = this.fechaformateada;
        console.log(this.disponibilidad);
        this.disponibilidadservice.postDisponibilidad(this.disponibilidad).subscribe(data => {
          // Obtener la disponibilidad creada
          const disponibilidadCreada = data;
          // Agregar la disponibilidad a la lista de disponibilidades
          this.disponibilidades.push(disponibilidadCreada);
          // Preguntar al usuario si desea agregar otra disponibilidad


          Swal.fire({
            title: 'Desea ingresar otra  fecha y hora',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Continuar!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.disponibilidad = new Disponibilidad();
              this.disponibilidad.cancha = this.datocancha;
              this.disponibilidad.estado = true;
              Swal.fire(
                'PROCESO',
                'CON EXITO',
                'success'
              )
            } else {
              this.crearReserva();
            }
          })
        });

    }
    });
  }

  eliminarDisponibilidad(disponibilidad: Disponibilidad) {
    const index = this.disponibilidades.indexOf(disponibilidad);
    if (index >= 0) {
      this.disponibilidades.splice(index, 1);
    }
  }
valor:any;
crearReserva() {
  // Crear una nueva reserva y asignar la lista de disponibilidades
  const reserva: Reserva = new Reserva();
  reserva.cliente = this.datocliente;
  reserva.disponibilidades = this.disponibilidades;
  // Guardar la reserva en la base de datos
  this.reservaService.postReservas(reserva).subscribe(data => {
    this.reserva = data; // Asignar la reserva creada a la propiedad
    this.datarese = data;
    console.log(data);
    this.toastr.success("Reservado Correctamente");
    this.displayEU = true;
    const numDisponibilidades = this.disponibilidades.length;
    this.valor = numDisponibilidades * this.costocan;
    console.log(numDisponibilidades);
  });
}

CrearNoPago() {
  if (this.reserva) { // Comprobar que la reserva tenga un valor
    this.pago_reserva.reserva = this.reserva;
    this.pago_reserva.valor = this.valor;
    this.pago_reserva.estadopago = "NO PAGADO";
    this.pagoreservaService.postPagoreserva(this.pago_reserva).subscribe({
      // ...
    });
    this.toastr.success("Reserva exitosa Pague Presencial");
  } else {
    console.error("No se puede crear el pago de reserva porque la reserva es null.");
  }
}

Accederadialogofoto(){
this.displayEU2 = true;
}
  CrearPago(){
    if (this.reserva) {
    this.cargarImagen();
    this.pago_reserva.foto = this.nombre_orignal;
    this.pago_reserva.reserva = this.reserva;
    this.pago_reserva.valor = this.valor;
    this.pago_reserva.estadopago = "EN ESPERA";

    this.pagoreservaService.postPagoreserva(this.pago_reserva).subscribe({
      
    });
    this.toastr.success("Reserva Exitosa Pago Enviado")
  }else{
    console.error("No se puede crear el pago de reserva porque la reserva es null.");
  }
  }

    // IMAGEN
    image!: any;
    file: any = '';
  
    // CAPTURO EL ARCHIVO
    nombre_orignal: string = "";
  
    cap_nombre_archivo: any;
    selectedFile!: File;
  
    public imageSelected(event: any) {
  
      this.selectedFile = event.target.files[0];
  
      // mostrar imagen seleccionada
      this.image = this.selectedFile;
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.file = reader.result;
      };
  
  
      // CAPTURAR EL NAME DE LA IMAGEN
      console.log("Seleciono una imagen: " + event.target.value);
      this.cap_nombre_archivo = event.target.value;
      console.log("Numero de datos del nombre del archivo => " + this.cap_nombre_archivo.length)
      this.nombre_orignal = this.cap_nombre_archivo.slice(12);
      console.log("Nombre imagen original => " + this.nombre_orignal);
      console.log(this.nombre_orignal);
  
    }
  
    cargarImagen() {
      this.fotoService.guararImagenes(this.selectedFile);
    }
  
    cerrardialog1(){
      this.displayEU = false;
      this.toastr.warning("Reserva cancelada");
    }
    cerrardialog2(){
      this.toastr.warning("Reserva cancelada");
      this.displayEU2 = false;
      this.displayEU = false;
      
    }

}




