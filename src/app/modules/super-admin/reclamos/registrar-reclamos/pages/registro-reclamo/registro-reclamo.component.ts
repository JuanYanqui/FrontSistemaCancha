import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { Administrador } from 'src/app/core/models/administrador';
import { Cliente } from 'src/app/core/models/cliente';
import { Reclamos } from 'src/app/core/models/reclamos';
import { ReclamoService } from 'src/app/shared/services/reclamo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-reclamo',
  templateUrl: './registro-reclamo.component.html',
})
export class RegistroReclamoComponent {

  currentDate: string;


  reclamo: Reclamos = new Reclamos;
  cliente: Cliente = new Cliente;
  administrador: Administrador = new Administrador;
  isButtonEnabled: boolean = false;
  verfTitulo: any;
  verfDescrip: any;
  verfAdmi: any;

  listaAdministradores: any[] = [];

  constructor(private cargarScripts: CargarScriptsService, private toastr: ToastrService, private router: Router, private reclamoService: ReclamoService) {
    cargarScripts.Carga(["registrarReclamo.component"])
    this.currentDate = new Date().toLocaleString();

  }

  ngOnInit() : void {
    let rec:Reclamos =  {
      titulo: "precio  alto",
      descripcion: "precio superior al acordado",
         cliente: {
          idPersona: 1,
          cedula: "0101010101",
          nombre: "jose",
          apellido: "illescas",
          genero: "m",
          direccion: "el valle",
          email: "jose@gmail.com",
          telefono: "5555555",
          celular: "0987654321",
          foto: "",
        },
        administrador: {
          idPersona: 3,
          cedula: "0102010201",
          nombre: "Camila",
          apellido: "Gonzalez",
          genero: "f",
          direccion: "mirraflores",
          email: "cami@gmai.com",
          telefono: "2414141",
          celular: "0999999999",
          foto: "",
        }}
    this.reclamoService.postReclamos(rec).subscribe(response=>{
      console.log(response);
      
    })
  }


  onSubmit(){
    //this.guardarReclamo();
    console.log(this.reclamo)
  }

  

  irListaReclamos(){
    this.router.navigate(['/reclamos/li'])
  }
  registrarReclamo() {
    if (this.reclamo.titulo?.length === 0) {
      this.toastr.error("Campo titulo vacio!", "Error!");
      if (this.reclamo.descripcion?.length === 0) {
        this.toastr.error("Campo descripcion vacio!", "Error!");
        if (this.reclamo.administrador === null) {
          this.toastr.error("Campo administrador vacio!", "Error!");

        }

      }
    }
  }
}
