import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { Administrador } from 'src/app/core/models/administrador';
import { Cliente } from 'src/app/core/models/cliente';
import { Persona } from 'src/app/core/models/persona';
import { Reclamos } from 'src/app/core/models/reclamos';
import { ReclamoService } from 'src/app/shared/services/reclamo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-reclamo',
  templateUrl: './registro-reclamo.component.html',
})
export class RegistroReclamoComponent {

  currentDate: string;

  blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/

  reclamo: Reclamos = new Reclamos();

  
  cliente: Persona[]=[];
  administrador: Persona[]=[];
  

  listaAdministradores: any[] = [];

  constructor(private cargarScripts: CargarScriptsService, private toastr: ToastrService, private router: Router, private reclamoService: ReclamoService) {
    cargarScripts.Carga(["registrarReclamo.component"])
    this.currentDate = new Date().toLocaleString();

  }

  ngOnInit() : void {

    this.reclamoService.getAdministrador()
    .subscribe(response => this.administrador = response)
    //this.reclamoService.getReclamos()
    //.subscribe(response=>console.log(response)
    //);
    this.reclamoService.getCliente()
    .subscribe(response => this.cliente = response)
  }

  guardarReclamo(){
    this.reclamoService.postReclamos(this.reclamo)
    .subscribe(response=> console.log("EXITO!!")
    )
  }
  onSubmit(){
    console.log(this.reclamo)
    this.guardarReclamo()
  }
}
