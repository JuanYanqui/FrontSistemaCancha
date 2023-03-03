import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/core/models/persona';
import { Reclamos } from 'src/app/core/models/reclamos';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { ReclamoService } from 'src/app/shared/services/reclamo.service';


@Component({
  selector: 'app-bienvenido-administrador',
  templateUrl: './bienvenido-administrador.component.html',
  styleUrls: ['./bienvenido-administrador.component.css']
})
export class BienvenidoAdministradorComponent {

  @ViewChild('btnnotif', {static: true}) btnnotif: ElementRef | undefined;
  idAdmin: number = 0;
  notificaciones: any[] | undefined;
  notificacionesPendientes: number | undefined;
  notificacionesMostradas = false;
  mostrarDialogo = false;
  modalRef: any;
  modalService: any;

  constructor(private canchaService: CanchasService, private toastr: ToastrService, private personaService: PersonaService,  private router: Router, private reclamoService: ReclamoService) {

    
    
  }

  ngOnInit() : void {
   this.obtenerReclamos();
   this.obtenerReclamos2();
 }

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
    }
  );
}

mostrarNotificaciones() {
  this.notificacionesMostradas = !this.notificacionesMostradas;
}

listaReclamos: Reclamos[]=[];
  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";
  displayEU: boolean = false;
  blockSpecial: RegExp = /^[^<>!]+$/ ///^[^<>!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/
  reclamo: Reclamos = new Reclamos;
  persona: Persona = new Persona;
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
  }
  
  obtenerReclamos(): void {
    this.idAdmin = Number(localStorage.getItem("localIdPersona"))
  this.reclamoService.getReclamosNotificacion(this.idAdmin).subscribe(
      data => {
        this.listaReclamos = data;
        console.log("EXITO RECLAMOS OBTENIDOS!!");
        
      }
    );
  } 

  marcarComoAtendido(reclamo: any) {
    this.reclamoService.updateReclamos(this.reclamo, this.reclamo.idReclamo).subscribe(
      data => {
        this.reclamo.idReclamo = data.idReclamo;
        
            console.log(data);
            
            this.obtenerReclamos();
          }
        )
        this.limpiar();this.limpiar();
      }

      /*marcarComoAtendido(reclamo: any) {
        const data = {
          ...reclamo,
          estado: true
        };
        this.reclamoService.updateReclamos(data, reclamo.idReclamo).subscribe(
          data => {
            console.log(data);
            this.obtenerReclamos();
          }
        );
        this.limpiar();
      }

      /*marcarComoAtendido(reclamo: any) {
        const data = {
          ...reclamo,
          estado: true
        };
        const idReclamo = reclamo.idReclamo;
        if (!idReclamo) {
          console.error('ID de reclamo no encontrado');
          return;
        }
        this.reclamoService.updateReclamos(data, idReclamo).subscribe(
          data => {
            console.log(data);
            this.obtenerReclamos();
          },
          error => {
            console.error(error);
          }
        );
        this.limpiar();
      }*/
      

      limpiar() {
        this.displayEU = false;
        this.reclamo = new Reclamos;
        this.loading = true;
        this.listaReclamos = [];
        this.obtenerReclamos();
        this.obtenerReclamos2();
      }
  



}