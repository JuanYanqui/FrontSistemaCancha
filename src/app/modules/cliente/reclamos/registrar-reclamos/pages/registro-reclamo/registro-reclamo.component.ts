import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { Persona } from 'src/app/core/models/persona';
import { Reclamos } from 'src/app/core/models/reclamos';
import { Rol } from 'src/app/core/models/roles';
import { Usuario } from 'src/app/core/models/usuario';
import { FotoService } from 'src/app/shared/services/foto.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { ReclamoService } from 'src/app/shared/services/reclamo.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-reclamo',
  templateUrl: './registro-reclamo.component.html',
  styleUrls: ['./registro-reclamo.component.css']

})
export class RegistroReclamoComponent {

  fechaActual = new Date();
  blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  reclamo: Reclamos = new Reclamos();
  cliente: Persona[]=[];
  administrador: Persona[]=[];
  listaReclamos: any[] = [];
  today = new Date().toLocaleString();
  displayEU: boolean = false;
  loading?: boolean

  constructor(private cargarScripts: CargarScriptsService, private toastr: ToastrService, private router: Router, private reclamoService: ReclamoService) {
    cargarScripts.Carga(["registrarReclamo.component"])
    this.fechaActual.setHours(0, 0, 0, 0);

  }

  recargar($event: any): void {

    this.router.navigate(['/cliente/reclamo/register-reclamo'])
    console.log($event)
  }

  ngOnInit() : void {

    this.reclamoService.getAdministrador()
    .subscribe(response => this.administrador = response)
    
    this.reclamoService.getCliente()
    .subscribe(response => this.cliente = response)
  }

  guardarReclamo(){
    if (this.reclamo.titulo?.length === 0) {
      this.toastr.error("Campo titulo vacio!", "Error!");
      if (this.reclamo.descripcion?.length === 0) {
        this.toastr.error("Campo desccripcion vacio!", "Error!");
        if (this.reclamo.fecha_reclamo === null ) {
          this.toastr.error("Campo fecha vacio!", "Error!");
        }

      }
    }
    if (this.reclamo.titulo != '' && this.reclamo.descripcion != '' && this.reclamo.fecha_reclamo != null) {
      
    this.reclamoService.postReclamos(this.reclamo)
    .subscribe(response=> console.log("EXITO!!")
    
    )
    this.limpiar();
    this.reclamoService.getReclamos()
    this.recargar(this.reclamo);
    Swal.fire('Reclamo guardado correctamente!', 'success');
    Swal.fire({
      icon: 'success',
      title: 'En buena hora',
      text: 'Reclamo registrado correctamente!',
    })}
  }
  onSubmit(){
    console.log(this.reclamo)
    this.guardarReclamo()
  }

  limpiar() {
    this.displayEU = false;
    this.reclamo = new Reclamos;

    this.loading = true;
    this.listaReclamos = [];
    window.location.reload();
  }
}
