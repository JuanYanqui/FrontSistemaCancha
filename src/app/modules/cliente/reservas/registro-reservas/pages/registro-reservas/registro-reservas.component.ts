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
  

  constructor(private canchaService: CanchasService,private reservaService: ReservaService, private disponibilidadservice: DisponibilidadService, private toastr: ToastrService) {
    this.fechas = this.generarFechas();
    this.horas = this.generarHoras();
    this.obtenercancha();
    
    // let idpersona = Number(localStorage.setItem("localIdPersona"));
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
    this.disponibilidad.hora = hora;
    this.disponibilidad.fecha = fecha;
    this.disponibilidad.cancha = this.datocancha;
    this.disponibilidadservice.postDisponibilidad(this.disponibilidad).subscribe(data=>{
      this.disponibilidad = data;
this.capturado = this.disponibilidad.idDisponibilidad;



    });
    this.toastr.success("fecha aguardada");
   
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


obtenerDisponibilidad() {
  this.disponibilidadservice.getDisponibilidad().subscribe(
    data => {
      this.listadisponibilidad = data;
      console.log(data);
    }
  );
}
idobtendo!: number;
buscarid(iddis: number){
this.disponibilidadservice.getPorId(iddis).subscribe(data=>{
  this.idobtendo = data.idDisponibilidad;
  console.log();

})
}

}




