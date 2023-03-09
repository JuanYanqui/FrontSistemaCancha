import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Canchas } from 'src/app/core/models/canchas';
import { Persona } from 'src/app/core/models/persona';
import { Reclamos } from 'src/app/core/models/reclamos';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { ReclamoService } from 'src/app/shared/services/reclamo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-reclamos',
  templateUrl: './edit-reclamos.component.html',
  styleUrls: ['./edit-reclamos.component.css']
})
export class EditReclamosComponent {

  listaReclamos: any[] = [];
  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";
  
  reclamo: Reclamos = new Reclamos;
  persona: Persona = new Persona;

  client: Persona[] = [];
  administrator: Persona[] = [];

  pageActual: number = 1;
  totalRecords?: number;
  loading?: boolean

  selectAll: boolean = false;
  displayEU: boolean = false;

  idclient: number = 0;
  subcadena: string = '';

  constructor(private canchaService: CanchasService, private toastr: ToastrService, private personaService: PersonaService, private router: Router, private reclamoService: ReclamoService) {
    this.obtenerReclamos();

  }

  onKeyPressLetras(event: KeyboardEvent) {
    const input = event.key;
    const pattern = /^[a-zA-Z\s]*$/;

    if (!pattern.test(input)) {
      event.preventDefault();
    }
  }

  descripcionSubcadena(cadena: string) {
    this.subcadena = '';
    this.subcadena = cadena.substring(0, 10) + "...";
  }

  editarReclamo(reclamo: Reclamos) {
    this.displayEU = true;
    this.reclamo = reclamo;
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
      this.displayEU = false;
      Swal.fire({
        title: 'Reclamo actualizado correctamente!',
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
        }
      })
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
      Swal.fire({
      title: 'Esta seguro de eliminar este reclamo!',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar!',
      showCancelButton: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.reclamoService.deleteReclamoById(idReclamo).subscribe(
          () => {
            Swal.fire({
              title: 'Reclamo eliminado correctamente!',
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
                this.limpiar();
              }
            })
          },
          error => {
            Swal.fire({
              title: 'No se pudo eliminar el reclamo!',
              icon: 'error',
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
                this.limpiar();
              }
            })
          }
        );


      }
    })
  }

}