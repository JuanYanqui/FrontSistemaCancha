import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pago_Reserva } from 'src/app/core/models/pago_reserva';
import { Persona } from 'src/app/core/models/persona';
import { Reclamos } from 'src/app/core/models/reclamos';
import { Reserva } from 'src/app/core/models/reserva';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { Pago_ReservaServicio } from 'src/app/shared/services/pago_reserva.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { ReclamoService } from 'src/app/shared/services/reclamo.service';
import { ReservaService } from 'src/app/shared/services/reserva.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-bienvenido-administrador',
  templateUrl: './bienvenido-administrador.component.html',
  styleUrls: ['./bienvenido-administrador.component.css','./bienvenido-administrador.component.scss']
})
export class BienvenidoAdministradorComponent {

  @ViewChild('btnnotif', {static: true}) btnnotif: ElementRef | undefined;
  idAdmin: number = 0;
  notificaciones: any;
  notificacionesPendientes: number = 0;
  notificacionesMostradas = false;
  mostrarDialogo = false;
  modalRef: any;
  modalService: any;
  reservas: Reserva[] =[];
  totalNotificaciones: number = 0;
  location: any;


  constructor(private pagoreservaService: Pago_ReservaServicio, private reservaService: ReservaService, private canchaService: CanchasService, private toastr: ToastrService, private personaService: PersonaService,  private router: Router, private reclamoService: ReclamoService) {

    
    
  }

  ngOnInit() : void {
   //this.obtenerReclamosYReservas();
   this.obtenerReclamos2();
   this.obtenerReservas2();
   //this.obtenerNotificaciones();
   //this.obtenerReservasPorPersona();  
   
  }



cliente: Persona= new Persona;
listaReclamos: Reclamos[]=[];
listaReservas: Reserva[]=[];
listaPagos: any;
  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";
  displayEU: boolean = false;
  blockSpecial: RegExp = /^[^<>!]+$/ ///^[^<>!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/
  reclamo: Reclamos = new Reclamos;
  persona: Persona = new Persona;
  reserva: Reserva = new Reserva;
  pageActual:number=1;

  client: Persona[]=[];
  administrator: Persona[]=[];
  totalRecords?: number;

  loading?: boolean

  selectAll: boolean = false;

  i: number = 0;
  

  verReclamo(reclamo: Reclamos) {
    
    this.displayEU = true;

    this.reclamo.idReclamo = reclamo.idReclamo;
    this.reclamo.titulo = reclamo.titulo;
    this.reclamo.descripcion = reclamo.descripcion;
    this.reclamo.fecha_reclamo = reclamo.fecha_reclamo;
    this.reclamo.estado = true;
    this.reclamo.cliente = reclamo.cliente;
    this.reclamo.administrador = reclamo.administrador;
    this.persona.foto = reclamo.cliente?.foto;
  }  
  
  obtenerReclamosYReservas(): void {
    this.idAdmin = Number(localStorage.getItem("localIdPersona"));
    let notificaciones: any[] = [];

    // Obtener reclamos
    this.reclamoService.getReclamosNotificacion(this.idAdmin).subscribe(
        data => {
            this.listaReclamos = data;
            console.log("EXITO RECLAMOS OBTENIDOS!!");
            console.log(data);

            // Agregar reclamos a la lista de notificaciones
            notificaciones = notificaciones.concat(this.listaReclamos);

            // Obtener reservas despu??s de obtener reclamos
            this.reservaService.getReservasPorPersona(this.idAdmin).subscribe(
                data => {
                    this.listaReservas = data;
                    console.log("EXITO RESERVAS OBTENIDAS!!");
                    console.log(data);
                    

                    // Agregar reservas a la lista de notificaciones
                    notificaciones = notificaciones.concat(this.listaReservas);

                    // Ordenar notificaciones por fecha
                    notificaciones.sort((a, b) => {
                      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();

                    });

                    // Asignar la lista combinada y ordenada a listaNotificaciones
                    this.notificaciones = notificaciones;
                }
            );
        }
    );
}



  marcarComoAtendido(reclamo: any) {
    this.reclamoService.updateReclamos(this.reclamo, this.reclamo.idReclamo).subscribe(
      data => {
        this.reclamo.idReclamo = data.idReclamo;
        
            console.log(data);
            this.obtenerReclamosYReservas();
            this.displayReclamo = false;
            window.location.reload();
            
          }
        )
      }      

      limpiar() {
        this.displayEU = false;
        this.reclamo = new Reclamos;
        this.loading = true;
        this.listaReclamos = [];
        this.obtenerReclamosYReservas();
        //window.location.reload()
      }

      recargar(){
        window.location.reload();
        this.obtenerReclamosYReservas();
      }
  
  ///////////////////////////////////////////////////////////////////////////////////

  obtenerReclamos2() {
    this.idAdmin = Number(localStorage.getItem("localIdPersona"))
    this.reclamoService.getReclamosNotificacion(this.idAdmin).subscribe(
      (reclamos: any[]) => {
        this.notificacionesPendientes = reclamos.length;
        this.notificaciones = reclamos;
        const index = this.notificaciones.indexOf(reclamos);
        if (index !== -1) {
          this.notificaciones.splice(index, 1);
          this.notificacionesPendientes = this.notificaciones.length;
        }
  
        // Actualizar totalNotificaciones
        this.totalNotificaciones += reclamos.length;
      }
    );
  }

  obtenerReservas2() {
    this.idAdmin = Number(localStorage.getItem("localIdPersona"))
    this.reservaService.getReservasPorPersona(this.idAdmin).subscribe(
      (reserva: any[]) => {
        this.notificacionesPendientes = reserva.length;
        this.notificaciones = reserva;
        const index = this.notificaciones.indexOf(reserva);
        if (index !== -1) {
          this.notificaciones.splice(index, 1);
          this.notificacionesPendientes = this.notificaciones.length;
        }
  
        this.totalNotificaciones += reserva.length;
      }
    );
  }

obtenerNotificaciones() {
  this.idAdmin = Number(localStorage.getItem("localIdPersona"))

  let totalNotificacionesPendientes = 0;

  // Obtener reclamos
  this.reclamoService.getReclamosNotificacion(this.idAdmin).subscribe(
    (reclamos: any[]) => {
      totalNotificacionesPendientes += reclamos.length;
      this.notificaciones.push(...reclamos);
      const index = this.notificaciones.indexOf(reclamos);
      if (index !== -1) {
        this.notificaciones.splice(index, 1);
      }
    }
  );

  // Obtener reservas
  this.reservaService.getReservasPorPersona(this.idAdmin).subscribe(
    data => {
      this.listaReservas = data;
      this.listaReservas.forEach(reserva => {
        totalNotificacionesPendientes++;
      });
      this.notificacionesPendientes = totalNotificacionesPendientes;
    }
  );
}




displayReclamo = false;
displayReserva = false;

// Crear una funci??n para mostrar el di??logo de reclamo
verReclamos(reclamo: Reclamos) {
  this.reclamo = reclamo; // Establecer el reclamo seleccionado
  this.displayReclamo = true; // Mostrar el di??logo de reclamo
  this.verReclamo(reclamo);

}



// Crear una funci??n para mostrar el di??logo de reserva
verReservas(reserva: Reserva) {
  this.reserva = reserva;
  this.reserva.idReserva = reserva.idReserva; // Establecer la reserva seleccionada
  this.displayReserva = true; // Mostrar el di??logo de reserva
}

idcli:any;
  datocli: any;
  datocliente:any;
  clientedata:any;
  reservadata: any;
obtenerreservas(reserva: Reserva) {
  this.pagoreservaService.Reservasporpago(this.idcliente).subscribe(data =>{
    this.listaPagos = data;
    console.log("esta es la data"+data);

    this.displayReserva = true;
  })
}
idreserva:any;
estado = true;
/*actualizarEstado(idRes: number){

  this.idreserva = idRes ? idRes : null;
  console.log(this.idreserva);
  this.reservaService.actualizarEstado(this.idreserva, this.estado)
    .subscribe(reserva => {
      this.reservadata = reserva;
      this.idreserva = this.reservadata.idReserva;
      console.log('Reserva actualizada:', reserva);
      // Aqu?? puedes agregar la l??gica adicional que necesites despu??s de actualizar el estado de la reserva
    }, error => {
      console.error('Error al actualizar la reserva:', error);
      // Aqu?? puedes manejar el error si algo sale mal durante la actualizaci??n del estado de la reserva
    });
}*/

actualizarEstado(idReserva: number) {
  console.log(idReserva);
  this.reservaService.actualizarEstado(idReserva, this.estado)
    .subscribe(reserva => {
      this.reservadata = reserva;
      console.log('Reserva actualizada:', reserva);
      // Aqu?? puedes agregar la l??gica adicional que necesites despu??s de actualizar el estado de la reserva
    }, error => {
      console.error('Error al actualizar la reserva:', error);
      // Aqu?? puedes manejar el error si algo sale mal durante la actualizaci??n del estado de la reserva
    });
    
}

/*actualizarEstado(reserva: Reserva): void {

  this.reservaService.actualizarEstado(reserva.idReserva, this.estado)
    .subscribe(reserva => {
      console.log('Reserva actualizada:', reserva);
      // Aqu?? puedes agregar la l??gica adicional que necesites despu??s de actualizar el estado de la reserva
    }, error => {
      console.error('Error al actualizar la reserva:', error);
      // Aqu?? puedes manejar el error si algo sale mal durante la actualizaci??n del estado de la reserva
    });
    this.limpiar();this.limpiar();
}*/

idcliente:any;
buscarid(idcli: number, idMiRes: number){
  //this.actualizarEstado(idReserva);
  console.log(idcli);
  console.log(idMiRes);
  
  this.idcliente = idcli;
  this.pagoreservaService.Reservasporpago(this.idcliente).subscribe(data => {
    console.log(data);
    this.clientedata = data;
    this.idcliente = this.clientedata.idPersona; // assign data to the array
  this.listaPagos = data;
    
  });
 this.verReservas(this.reserva);
 this.actualizarEstado(idMiRes);

}
/*ejecutarMetodos(idReserva: number, pago: number) {
  this.actualizarEstado(idReserva);
  this.abrir(p);
  
}*/



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
miReclamo: any;

displayDialog = false;

  cerrarDialog() {
    this.displayDialog = false;
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
      ;
    }

    /*abrir(pago: Pago_Reserva){
      this.actualizarEstado(this.reserva.idReserva);
      this.reservaService.actualizarEstado(this.reserva.idReserva, this.estado).subscribe(reserva => {
        console.log('Reserva actualizada:', reserva);
        pago.estadopago = "RESERVADO";
        this.pagoreservaService.updatePagoReserva(pago, pago.idPagoReserva).subscribe({
          // aqu?? puedes manejar la respuesta del servicio de actualizaci??n de pago de reserva
        });
        this.displayEU = false;
      }, error => {
        console.error('Error al actualizar la reserva:', error);
        // aqu?? puedes manejar el error del servicio de actualizaci??n del estado de reserva
      });   
    }*/
    
    cancelar(){
      this.displayEU =false;
    }
    
}