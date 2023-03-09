import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { Canchas } from 'src/app/core/models/canchas';
import { Cliente } from 'src/app/core/models/cliente';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { Persona } from 'src/app/core/models/persona';
import { Reclamos } from 'src/app/core/models/reclamos';
import { Rol } from 'src/app/core/models/roles';
import { Usuario } from 'src/app/core/models/usuario';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { FotoService } from 'src/app/shared/services/foto.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { ReclamoService } from 'src/app/shared/services/reclamo.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registro-reclamo',
  templateUrl: './registro-reclamo.component.html',
  styleUrls: ['./registro-reclamo.component.css']

})
export class RegistroReclamoComponent {

  canchas: Canchas = new Canchas;
  personaCli: Persona = new Persona;
  personaAdmi: Persona = new Persona;
  reclamo: Reclamos = new Reclamos();

  id: number = 0;
  idclient: number = 0;
  idCancha: number = 0;
  idPersona?: number = 0;
  idsalida!: number;
  nombre!: string;
  apellido?: string;
  nombreAdmin?: String;
  apellidoAdmin?: string;

  cliente: Persona[] = [];
  administrador: Persona[] = [];
  listaReclamos: any[] = [];

  today = new Date().toLocaleString();
  displayEU: boolean = false;
  loading?: boolean

  currentDate = new Date();
  isoDate = this.currentDate.toISOString();
  formattedDate = this.isoDate.substring(0, 10);

  constructor(private canchaService: CanchasService, private clienteService: PersonaService, private personaService: PersonaService, private cargarScripts: CargarScriptsService, private toastr: ToastrService, private router: Router, private reclamoService: ReclamoService) {
    cargarScripts.Carga(["registrarReclamo.component"])

  }

  recargar(): void {
    this.router.navigate(['/cliente/reclamo/register-reclamo'])
  }

  ngOnInit(): void {
    this.verpersona();
    this.verAdministrador(this.canchas.idCancha);
  }

  onKeyPressLetras(event: KeyboardEvent) {
    const input = event.key;
    const pattern = /^[a-zA-Z\s]*$/;

    if (!pattern.test(input)) {
      event.preventDefault();
    }
  }

  obtenerReclamos() {
    this.idclient = Number(localStorage.getItem("localIdPersona"))
    this.reclamoService.getByClient(this.idclient).subscribe(
      data => {
        this.listaReclamos = data;
      }
    );
  }


  guardarReclamo() {
    if (this.reclamo.titulo?.length === 0) { this.toastr.error("Campo titulo vacio!", "Error!"); }
    else if (this.reclamo.descripcion?.length === 0) { this.toastr.error("Campo desccripcion vacio!", "Error!"); }
    else {
      this.reclamoService.postReclamos(this.reclamo)
        .subscribe(response => console.log("EXITO!!"))

      Swal.fire({
        title: 'Reclamo guardado correctamente!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.limpiar()
          this.recargar()
        }
      })
    }
  }

  limpiar() {
    this.displayEU = false;
    this.reclamo = new Reclamos;

    this.loading = true;
    this.listaReclamos = [];
    //window.location.reload()
    this.verpersona();
    this.verAdministrador(this.canchas.idCancha);
  }

  verpersona() {
    this.id = Number(localStorage.getItem("localIdPersona"))
      this.personaService.getPorId(this.id).subscribe(data => {
        this.personaCli.idPersona = data.idPersona;
        this.personaCli.nombre = data.nombre;
        this.personaCli.apellido = data.apellido;
        this.personaCli.fechaNacimmiento = data.fechaNacimmiento;
        this.personaCli.genero = data.genero;
        this.personaCli.direccion = data.direccion;
        this.personaCli.email = data.email;
        this.personaCli.telefono = data.telefono;
        this.personaCli.celular = data.celular;
        this.personaCli.foto = data.foto;
        this.personaCli.fechaRegistro = data.fechaRegistro;

        this.reclamo.cliente = this.personaCli

        this.nombre = data.nombre;
        this.apellido = data.apellido;

      }
    )
  }

  verAdministrador(id: number) {
    id = Number(localStorage.getItem("canchaActual"));
    this.canchaService.getPorId(id).subscribe(data => {
      this.displayEU = true;
      this.canchas.nombre = data.nombre;
      this.canchas.descripcion = data.descripcion;
      this.canchas.tarifa = data.tarifa;
      this.canchas.altura = data.altura;
      this.canchas.ancho = data.ancho;
      this.canchas.vacante = true;
      this.canchas.foto = data.foto;

      this.personaAdmi.idPersona = Number(data.establecimiento?.persona?.idPersona);
      this.personaAdmi.nombre = String(data.establecimiento?.persona?.nombre);
      this.personaAdmi.apellido = String(data.establecimiento?.persona?.apellido);
      this.personaAdmi.fechaNacimmiento = (data.establecimiento?.persona?.fechaNacimmiento);
      this.personaAdmi.genero = String(data.establecimiento?.persona?.genero);
      this.personaAdmi.direccion = String(data.establecimiento?.persona?.direccion);
      this.personaAdmi.email = String(data.establecimiento?.persona?.email);
      this.personaAdmi.telefono = String(data.establecimiento?.persona?.telefono);
      this.personaAdmi.celular = String(data.establecimiento?.persona?.celular);
      this.personaAdmi.foto = String(data.establecimiento?.persona?.foto);
      this.personaAdmi.fechaRegistro = (data.establecimiento?.persona?.fechaRegistro);

      this.reclamo.administrador = this.personaAdmi

      this.idPersona = data.establecimiento?.persona?.idPersona;
      this.apellidoAdmin = data.establecimiento?.persona?.apellido;
      this.nombreAdmin = data.establecimiento?.persona?.nombre;


    });
  }
}