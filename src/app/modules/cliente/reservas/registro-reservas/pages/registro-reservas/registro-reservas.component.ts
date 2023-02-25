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
  reserva: Reserva = new Reserva;
  idcanchas: any;
  disponibilidad: Disponibilidad = new Disponibilidad;
  listadisponibilidad:any []=[];
  datocancha:any;
  idcli:any;
  datocliente:any;

  constructor(private canchaService: CanchasService,private reservaService: ReservaService, private disponibilidadservice: DisponibilidadService, private toastr: ToastrService, private personaservice: PersonaService) {
    this.fechas = this.generarFechas();
    this.horas = this.generarHoras();
    this.obtenercancha();
    this.obtenercliente();
    
    // let idpersona = Number(localStorage.setItem("localIdPersona"));
  }

  obtenercliente(){
    this.idcli = localStorage.getItem("localIdPersona");
this.personaservice.getPorId(this.idcli).subscribe( data=>{
  this.datocliente = data;
  console.log(data);

});
  }
  
fechas: Date[];
horas: number[];


horaInicial = 9; // Hora inicial a las 9:00 AM
horaFinal = 18; // Hora final a las 6:00 PM

obtenercancha(){
  this.idcanchas = localStorage.getItem("idCancha");
  console.log(this.idcanchas);
  this.canchaService.getPorId(this.idcanchas).subscribe(data=>{
    this.datocancha = data;
    console.log(this.datocancha);

  })
}

private generarFechas(): Date[] {
  const fechas = [];
  const fechaInicial = new Date();
  const numDias = 7; // Generar una tabla para la próxima semana
  for (let i = 0; i < numDias; i++) {
    const fecha = new Date(fechaInicial);
    fecha.setDate(fechaInicial.getDate() + i);
    fechas.push(fecha);
  }
  return fechas;
}

private generarHoras(): number[] {
  const horas = [];
  for (let i = this.horaInicial; i <= this.horaFinal; i++) {
    horas.push(i);
  }
  return horas;
}

fechaSeleccionada!: Date;
horaSeleccionada!: number;


guardarFechaYHora(hora: number, fecha: Date) {
  this.fechaSeleccionada = fecha;
  this.horaSeleccionada = hora;
  console.log(`Se seleccionó la fecha ${this.fechaSeleccionada} a las ${this.horaSeleccionada}:00`);
  // Aquí puedes hacer cualquier otra cosa que necesites con la fecha y la hora seleccionadas
}

reservas: {[key: string]: boolean} = {};

esReservado(hora: number, fecha: Date): boolean {
  const clave = this.generarClave(hora, fecha);
  return this.reservas[clave] || false;
}

botonesReservados: {hora: number, fecha: Date}[] = [];

capturado:any;

reservar(hora: number, fecha: Date) {
  const clave = this.generarClave(hora, fecha);
  this.reservas[clave] = !this.reservas[clave];
  
  if (this.esReservado(hora, fecha)) {
    this.botonesReservados.push({hora, fecha: new Date(fecha.getTime())});
    const index = this.botonesReservados.length - 1;
    const fechaFormateada = this.formatoFecha(this.botonesReservados[index].fecha);
    console.log(this.botonesReservados);
    console.log(`Reservado ${fechaFormateada} a las ${hora}:00`);

    // Send POST request to create reservation
//     this.disponibilidad.hora = hora;
//     this.disponibilidad.fecha = fecha;
//     this.disponibilidad.cancha = this.datocancha;
//     this.disponibilidadservice.postDisponibilidad(this.disponibilidad).subscribe(data=>{
//       this.disponibilidad = data;
// this.capturado = this.disponibilidad.idDisponibilidad;



//     });
    
   
  } else {
    const index = this.botonesReservados.findIndex(bot => bot.hora === hora && bot.fecha.getTime() === fecha.getTime());
    if (index > -1) {
      this.botonesReservados.splice(index, 1);
      console.log(`Cancelado ${this.formatoFecha(fecha)} a las ${hora}:00`);

      // Send DELETE request to remove reservation
      this.disponibilidadservice.deleteCanchas(this.capturado).subscribe(data=>{
        this.toastr.success("fecha eliminada");
  
      });
    }
  }
}

formatoFecha(fecha: Date): string {
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear().toString();
  return `${dia}/${mes}/${anio}`;
}

generarClave(hora: number, fecha: Date): string {
  return `${fecha.toISOString()}_${hora}`;
}



// GuardarBotones() {
//   this.botonesReservados.forEach(bot => {
//     // Enviar solicitud POST para crear reserva
//     this.disponibilidad.hora = bot.hora;
//     this.disponibilidad.fecha = bot.fecha;
//     this.disponibilidad.cancha = this.datocancha;
//     this.disponibilidadservice.postDisponibilidad(this.disponibilidad).subscribe(data => {
//       this.disponibilidad = data;
//       console.log(`Reservado ${this.formatoFecha(bot.fecha)} a las ${bot.hora}:00`);
//       this.toastr.success("fecha aguardada");

//       // Verificar si disponibilidades es undefined y si lo es, inicializarlo como un arreglo vacío
//       if (this.reserva.disponibilidades === undefined) {
//         this.reserva.disponibilidades = [];
//       }

//       // Agrega la disponibilidad a la lista de disponibilidades de la Reserva
//       this.reserva.disponibilidades.push(this.disponibilidad);

//       // Obtener el idDisponibilidad de la disponibilidad que se acaba de guardar
//       const idDisponibilidad = this.disponibilidad.idDisponibilidad;

//       this.reservaService.postReservas(this.reserva).subscribe(data => {
//         // Agregar el idDisponibilidad a la lista de ids de disponibilidad de la reserva
//         this.reserva.disponibilidades.push(this.disponibilidad);

//         this.toastr.success("Reservado con éxito");
//         this.botonesReservados = [];
//         this.reserva = new Reserva;

//         // Reinicia la lista de disponibilidades de la Reserva
//         this.reserva.disponibilidades = [];
//       });
//     });
//   });
// }

// GuardarBotones(){
//   this.botonesReservados.forEach(bot => {
//     // Enviar solicitud POST para crear reserva
//     this.disponibilidad.hora = bot.hora;
//     this.disponibilidad.fecha = bot.fecha;
//     this.disponibilidad.cancha = this.datocancha;
//     this.disponibilidadservice.postDisponibilidad(this.disponibilidad).subscribe(data=>{
//       this.disponibilidad = data;
//       console.log(`Reservado ${this.formatoFecha(bot.fecha)} a las ${bot.hora}:00`);
//       this.toastr.success("fecha aguardada");
    
//       // Verificar si disponibilidades es undefined y si lo es, inicializarlo como un arreglo vacío
//       if (this.reserva.disponibilidad === undefined) {
//         this.reserva.disponibilidad = [];
//       }

//       // Agrega la disponibilidad a la lista de disponibilidades de la Reserva
//       this.reserva.disponibilidad.push(this.disponibilidad);

//       this.reservaService.postReservas(this.reserva).subscribe(data=>{
//         this.toastr.success("Reservado con éxito");
//         this.botonesReservados = [];
//         this.reserva = new Reserva;
      
//         // Reinicia la lista de disponibilidades de la Reserva
//         this.reserva.disponibilidad.length = 0;
//       });
//     });
//   });
// }



// GuardarBotones(){
//   this.botonesReservados.forEach(bot => {
//     // Enviar solicitud POST para crear reserva
//     this.disponibilidad.hora = bot.hora;
//     this.disponibilidad.fecha = bot.fecha;
//     this.disponibilidad.cancha = this.datocancha;
//     this.disponibilidadservice.postDisponibilidad(this.disponibilidad).subscribe(data=>{
//       this.disponibilidad = data;
//       console.log(`Reservado ${this.formatoFecha(bot.fecha)} a las ${bot.hora}:00`);
//       this.toastr.success("fecha aguardada");
    
//       // Verificar si disponibilidades es undefined y si lo es, inicializarlo como un arreglo vacío
//       if (this.reserva.disponibilidad === undefined) {
//         this.reserva.disponibilidad = [];
//       }

//       // Agrega la disponibilidad a la lista de disponibilidades de la Reserva
//       this.reserva.disponibilidad.push(this.disponibilidad);

//       this.reservaService.postReservas(this.reserva).subscribe(data=>{
//         this.toastr.success("Reservado con éxito");
//         this.botonesReservados = [];
//         this.reserva = new Reserva;
      
//         // Reinicia la lista de disponibilidades de la Reserva
//         this.reserva.disponibilidad = [];
//       });
//     });
//   });
// }

// GuardarBotones(){
//   this.botonesReservados.forEach(bot => {
//     // Enviar solicitud POST para crear reserva
//     this.disponibilidad.hora = bot.hora;
//     this.disponibilidad.fecha = bot.fecha;
//     this.disponibilidad.cancha = this.datocancha;
//     this.disponibilidadservice.postDisponibilidad(this.disponibilidad).subscribe(data=>{
//       this.disponibilidad = data;
//       console.log(`Reservado ${this.formatoFecha(bot.fecha)} a las ${bot.hora}:00`);
//       this.toastr.success("fecha aguardada");
      
//       // Agrega la disponibilidad a la lista de disponibilidades de la Reserva
//       this.disponibilidadesli.push(this.disponibilidad);
//     });
    
      

//       // Asigna la lista de disponibilidades a la propiedad "disponibilidades" de la reserva
// this.reserva.disponibilidades = this.disponibilidadesli;

// this.reservaService.postReservas(this.reserva).subscribe(data=>{
//   this.toastr.success("Reservado con éxito");
//   this.botonesReservados = [];
//   this.reserva = new Reserva;
  
//   // Reinicia la lista de disponibilidades
//   this.disponibilidadesli = [];
// });
//   });
// }


// GuardarBotones() {
//   let disponibilidades: Disponibilidad[] = [];

//   this.botonesReservados.forEach(bot => {
//     // Crear una nueva disponibilidad
//     let disponibilidad: Disponibilidad = new Disponibilidad();
//     disponibilidad.hora = bot.hora;
//     disponibilidad.fecha = bot.fecha;
//     disponibilidad.cancha = this.datocancha;

//     // Guardar la disponibilidad en la base de datos
//     this.disponibilidadservice.postDisponibilidad(disponibilidad).subscribe(data => {
//       disponibilidades.push(data);
//       console.log(`Reservado ${this.formatoFecha(bot.fecha)} a las ${bot.hora}:00`);
//       this.toastr.success("Fecha aguardada");
//     });
//   });

//   // Crear una nueva reserva y asignarle las disponibilidades
//   let reserva: Reserva = new Reserva();
//   reserva.disponibilidades = disponibilidades;

//   // Guardar la reserva en la base de datos
//   this.reservaService.postReservas(reserva).subscribe(data => {
//     this.toastr.success("Reservado con éxito");
//     this.botonesReservados = [];
//     this.reserva = new Reserva();
//     disponibilidades = [];
//   });
// }


// GuardarBotones() {
//   let disponibilidades: Disponibilidad[] = [];

//   // Crear un arreglo de observables para crear las disponibilidades
//   const observables: Observable<Disponibilidad>[] = this.botonesReservados.map((bot, index) => {
//     // Crear una nueva disponibilidad
//     let disponibilidad: Disponibilidad = new Disponibilidad();
//     disponibilidad.hora = bot.hora;
//     disponibilidad.fecha = bot.fecha;
//     disponibilidad.cancha = this.datocancha;

//     // Retornar el observable de la solicitud POST para crear la disponibilidad
//     return this.disponibilidadservice.postDisponibilidad(disponibilidad);
//   });

//   // Ejecutar todas las solicitudes POST en paralelo
//   forkJoin(observables).subscribe(data => {
//     disponibilidades = data;

//     // Crear una nueva reserva y asignarle las disponibilidades
//     let reserva: Reserva = new Reserva();
//     reserva.disponibilidades = disponibilidades;

//     // Guardar la reserva en la base de datos
//     this.reserva.cliente = this.datocliente;
//     this.reservaService.postReservas(reserva).subscribe(data => {
//       this.toastr.success("Reservado con éxito");
//       this.botonesReservados = [];
//       this.reserva = new Reserva();
//       disponibilidades = [];
//     });
//   });
// }


GuardarBotones() {
  let disponibilidades: Disponibilidad[] = [];

  // Verificar si la disponibilidad ya existe en la base de datos
  this.disponibilidadservice.getDisponibilidadesPorFechaYHora(this.botonesReservados[0].fecha, this.botonesReservados[0].hora, this.datocancha.idCancha).subscribe(existingDisponibilidades => {
    console.log(existingDisponibilidades);
    if (existingDisponibilidades.length > 0) {
      this.toastr.error("Ya existe una disponibilidad para la fecha y hora especificadas");
    } else {
      // Crear un arreglo de observables para crear las disponibilidades
      const observables: Observable<Disponibilidad>[] = this.botonesReservados.map((bot, index) => {
        // Crear una nueva disponibilidad
        let disponibilidad: Disponibilidad = new Disponibilidad();
        disponibilidad.hora = bot.hora;
        disponibilidad.fecha = bot.fecha;
        disponibilidad.cancha = this.datocancha;

        // Retornar el observable de la solicitud POST para crear la disponibilidad
        return this.disponibilidadservice.postDisponibilidad(disponibilidad);
      });

      // Ejecutar todas las solicitudes POST en paralelo
      forkJoin(observables).subscribe(data => {
        disponibilidades = data;

        // Verificar si la reserva ya existe en la base de datos
       
          if (existingDisponibilidades.length > 0) {
            this.toastr.error("Ya existe una reserva para la fecha y hora especificadas");
          } else {
            // Crear una nueva reserva y asignarle las disponibilidades
            let reserva: Reserva = new Reserva();
            reserva.disponibilidades = disponibilidades;

            // Guardar la reserva en la base de datos
            this.reserva.cliente = this.datocliente;
            this.reservaService.postReservas(reserva).subscribe(data => {
              this.toastr.success("Reservado con éxito");
              this.botonesReservados = [];
              this.reserva = new Reserva();
              disponibilidades = [];
            });
          }
      });
    }
  });
}

// GuardarBotones() {
//   let disponibilidades: Disponibilidad[] = [];
  

//   // Verificar si la disponibilidad ya existe en la base de datos
//   this.disponibilidadservice.getDisponibilidadesPorFechaYHora(this.botonesReservados[0].fecha, this.botonesReservados[0].hora).subscribe(existingDisponibilidades => {
//     if (existingDisponibilidades.length > 0) {
//       this.toastr.error("Ya existe una disponibilidad para la fecha y hora especificadas");
//     } else {
//       // Crear un arreglo de observables para crear las disponibilidades
//       const observables: Observable<Disponibilidad>[] = this.botonesReservados.map((bot, index) => {
//         // Crear una nueva disponibilidad
//         let disponibilidad: Disponibilidad = new Disponibilidad();
//         disponibilidad.hora = bot.hora;
//         disponibilidad.fecha = bot.fecha;
//         disponibilidad.cancha = this.datocancha;

//         // Retornar el observable de la solicitud POST para crear la disponibilidad
//         return this.disponibilidadservice.postDisponibilidad(disponibilidad);
//       });

//       // Ejecutar todas las solicitudes POST en paralelo
//       forkJoin(observables).subscribe(data => {
//         disponibilidades = data;

//         // Verificar si la reserva ya existe en la base de datos
        
//           if (existingDisponibilidades.length > 0) {
//             this.toastr.error("Ya existe una reserva para la fecha y hora especificadas");
//           } else {
//             // Crear una nueva reserva y asignarle las disponibilidades
//             let reserva: Reserva = new Reserva();
//             reserva.disponibilidades = disponibilidades;

//             // Guardar la reserva en la base de datos
//             this.reservaService.postReservas(reserva).subscribe(data => {
//               this.toastr.success("Reservado con éxito");
//               this.botonesReservados = [];
//               this.reserva = new Reserva();
//               disponibilidades = [];
//             });
//           }
//       });
//     }
//   });
// }




// eliminarBotones(){
//   this.disponibilidadservice.deleteCanchas(this.capturado).subscribe(data => {
//     this.toastr.success("fecha eliminada");
//     const index = this.idDisponibilidades.indexOf(this.capturado);
//     if (index > -1) {
//       this.idDisponibilidades.splice(index, 1); // Eliminar ID del array
//     }
//   });
// }


}




