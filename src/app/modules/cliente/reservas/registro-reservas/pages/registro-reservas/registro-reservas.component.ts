import { CargarScriptsService } from 'src/app/cargar-scripts.service';

import { Component } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventSourceInput } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-registro-reservas',
  templateUrl: './registro-reservas.component.html',
  styleUrls: ['./registro-reservas.component.css']
})
export class RegistroReservasComponent {

  ngOnInit(): void {
    this.datosF();
  };
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   plugins: [dayGridPlugin],
  //   dateClick: this.handleDateClick.bind(this)
  // };

  // toggleWeekends() {
  //   this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  // }

  // handleDateClick(arg: any) {
  //   alert('date click! ' + arg.dateStr)
  // }
  // handleDateClick(info: DateClickArg) {
  //   alert('Fecha seleccionada: ' + info.dateStr);

  // }
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   dateClick: this.handleDateClick.bind(this)
  // };
  // eventsPromise: Promise<EventSourceInput>;

  // constructor() {
  //   this.eventsPromise = fetch('/event-source-url')
  //     .then(response => response.json())
  //     .then(data => {
  //       return {
  //         events: data
  //       };
  //     });
  // }

  // handleDateClick(arg: any) {
  //   alert('date click! ' + arg.dateStr);
  // }


  // events: any[];

  // options: any;

  // header: any;

  // constructor(private eventService: EventService) { }

  // ngOnInit() {
  //     this.eventService.getEvents().then(events => {
  //         this.events = events;
  //         this.options = {...this.options, ...{events: events}};
  //     });

  //     this.options = {
  //             initialDate : '2019-01-01',
  //             headerToolbar: {
  //                 left: 'prev,next today',
  //                 center: 'title',
  //                 right: 'dayGridMonth,timeGridWeek,timeGridDay'
  //             },
  //             editable: true,
  //             selectable:true,
  //             selectMirror: true,
  //             dayMaxEvents: true
  //     };
  // }



  calendarOptions:any;

  datosF() {
    const cumpleanos = ['2023-02-15', '2023-02-18', '2023-02-20']; // arreglo de fechas de cumpleaños
  
    const eventos = cumpleanos.map(fecha => {
      return {
        title: 'Cumpleaños',
        start: fecha,
        end: fecha
      };
    });
  
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialDate: '2023-02-13',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      events: eventos,
      dateClick: (info:any) => {
        console.log('Fecha seleccionada:', info.dateStr);
      }
    };
  }
}
