import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Canchas } from 'src/app/core/models/canchas';
import { Persona } from 'src/app/core/models/persona';
import { Reclamos } from 'src/app/core/models/reclamos';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { ReclamoService } from 'src/app/shared/services/reclamo.service';

@Component({
  selector: 'app-edit-reclamos',
  templateUrl: './edit-reclamos.component.html',
  styleUrls: ['./edit-reclamos.component.css']
})
export class EditReclamosComponent {
  /*
    personaCli: Persona = new Persona;
  
    personaAdmi: Persona = new Persona;
    
    canchas: Canchas = new Canchas;
      id: number = 0;
    idCancha: number = 0;
    idPersona?: number = 0;
    idP?: number = 0;
    idsalida!: number;
    nombre!: string;
    apellido?: string;
    nombreAdmin?: String;
    apellidoAdmin?: string;
  */
  listaReclamos: any[] = [];
  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";
  displayEU: boolean = false;
  blockSpecial: RegExp = /^[^<>!]+$/ ///^[^<>!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/
  reclamo: Reclamos = new Reclamos;
  persona: Persona = new Persona;
  pageActual: number = 1;

  client: Persona[] = [];
  administrator: Persona[] = [];
  totalRecords?: number;

  loading?: boolean

  selectAll: boolean = false;

  idclient: number = 0;

  constructor(private canchaService: CanchasService, private toastr: ToastrService, private personaService: PersonaService, private router: Router, private reclamoService: ReclamoService) {
    this.obtenerReclamos();

  }

  ngOnInit(): void {
    //this.verpersona();
    //this.verAdministrador(this.canchas.idCancha);
  }

  onKeyPressLetras(event: KeyboardEvent) {
    const input = event.key;
    const pattern = /^[a-zA-Z\s]*$/;

    if (!pattern.test(input)) {
      event.preventDefault();
    }
  }


  editarReclamo(reclamo: Reclamos) {

    this.displayEU = true;

    this.reclamo.idReclamo = reclamo.idReclamo;
    this.reclamo.titulo = reclamo.titulo;
    this.reclamo.descripcion = reclamo.descripcion;
    this.reclamo.fecha_reclamo = reclamo.fecha_reclamo;
    this.reclamo.cliente = reclamo.cliente;
    this.reclamo.administrador = reclamo.administrador;

    console.log(this.reclamo.idReclamo);
  }

  obtenerReclamos() {
    this.idclient = Number(localStorage.getItem("localIdPersona"))
    this.reclamoService.getByClient(this.idclient).subscribe(
      data => {
        this.listaReclamos = data;
      }
    );
  }




  actualizarReclamo() {
    console.log(this.reclamo.idReclamo);
    if (this.reclamo.titulo?.length === 0) { this.toastr.error("Campo titulo vacio!", "Error!"); }
    else if (this.reclamo.descripcion?.length === 0) { this.toastr.error("Campo desccripcion vacio!", "Error!"); }
    else {
      this.reclamoService.updateReclamos(this.reclamo, this.reclamo.idReclamo).subscribe(
        data => {
          this.reclamo.idReclamo = data.idReclamo;

          console.log(data);

          this.toastr.success('El reclamo se actualizo correctamente', 'Exitoso!');
          this.obtenerReclamos();
        }
      )
      this.limpiar();
    }
  }

  limpiar() {
    this.displayEU = false;
    this.reclamo = new Reclamos;

    this.loading = true;
    this.listaReclamos = [];
    this.obtenerReclamos();
  }

  eliminarReclamo(idReclamo: number) {
    this.reclamoService.deleteReclamoById(idReclamo).subscribe(
      () => {
        this.toastr.success('Reclamo eliminado correctamente', 'Eliminación exitosa');
        // Aquí puedes actualizar la lista de reclamos si es necesario
      },
      error => {
        console.log(error);
        this.toastr.error('No se pudo eliminar el reclamo', 'Error');
      }
    );
  }

}