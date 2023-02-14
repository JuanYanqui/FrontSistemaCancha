import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/core/models/persona';
import { Reclamos } from 'src/app/core/models/reclamos';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { ReclamoService } from 'src/app/shared/services/reclamo.service';

@Component({
  selector: 'app-edit-reclamos',
  templateUrl: './edit-reclamos.component.html',
  styleUrls: ['./edit-reclamos.component.css']
})
export class EditReclamosComponent {
  listaReclamos: any []=[];
  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";
  displayEU: boolean = false;
  blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/
  administrador: Persona = new Persona;
  cliente: Persona = new Persona;
  reclamo: Reclamos = new Reclamos;
  pageActual:number=1;

  client: Persona[]=[];
  administrator: Persona[]=[];
  totalRecords?: number;

  loading?: boolean

  selectAll: boolean = false;

  constructor(private toastr: ToastrService, private personaService: PersonaService,  private router: Router, private reclamoService: ReclamoService) {
    this.obtenerReclamos();
   }

   ngOnInit() : void {

    this.reclamoService.getAdministrador()
    .subscribe(response => this.administrator = response)
    
    this.reclamoService.getCliente()
    .subscribe(response => this.client = response)
  }

  editarReclamo(reclamo: Reclamos) {
    
    this.displayEU = true;

    this.reclamo.idReclamo = reclamo.idReclamo;
    this.reclamo.titulo = reclamo.titulo;
    this.reclamo.descripcion = reclamo.descripcion;
    this.reclamo.fecha_reclamo = reclamo.fecha_reclamo;
    this.cliente.nombre+' '+this.cliente.apellido == reclamo.cliente;
    this.administrador.nombre+' '+this.administrador.apellido == reclamo.administrador;
  }

  obtenerReclamos() {
    this.reclamoService.getReclamos().subscribe(
      data => {
        this.listaReclamos = data;
      }
    );
  } 

  actualizarReclamo() {
    this.reclamoService.updateReclamos(this.reclamo, this.reclamo.idReclamo).subscribe(
      data => {
        this.reclamo.idReclamo = data.idReclamo;
        
            console.log(data);
            this.limpiar();
            this.toastr.success('El reclamo se actualizo correctamente', 'Exitoso!');
            this.obtenerReclamos();
          }
        )
      }

      limpiar() {
        this.displayEU = false;
        this.reclamo = new Reclamos;
    
        this.loading = true;
        this.listaReclamos = [];
        this.obtenerReclamos();
      }
}

