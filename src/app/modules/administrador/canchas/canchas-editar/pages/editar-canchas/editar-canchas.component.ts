import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Canchas } from 'src/app/core/models/canchas';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { FotoService } from 'src/app/shared/services/foto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-canchas',
  templateUrl: './editar-canchas.component.html',
  styleUrls: ['./editar-canchas.component.css']
})
export class EditarCanchasComponent {

  listaCancha: any[] = [];
  cancha: Canchas = new Canchas;
  blockSpecial: RegExp = /^[^<>*!]+$/
  pageActual: number = 1;
  displayEU: boolean = false;
  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";
  subcadena: string = '';

  constructor(private toastr: ToastrService, private fotoService: FotoService, private canchasService: CanchasService, private router: Router) {
    this.obtenerCanchas();
  }

  obtenerCanchas() {
    this.canchasService.getCanchas().subscribe(
      data => {
        this.listaCancha = data;
        console.log(data)
      }
    );
  }

  editarCancha(cancha: Canchas) {

    this.displayEU = true;

    this.cancha.idCancha = cancha.idCancha;
    this.cancha.nombre = cancha.nombre;
    this.cancha.tarifa = cancha.tarifa;
    this.cancha.descripcion = cancha.descripcion;
    this.cancha.ancho = cancha.ancho;
    this.cancha.altura = cancha.altura;
    this.cancha.foto = cancha.foto;
  }

  ActDesCancha(cancha: Canchas) {
    console.log(cancha)

    this.cancha.idCancha = cancha.idCancha;
    this.cancha.nombre = cancha.nombre;
    this.cancha.tarifa = cancha.tarifa;
    this.cancha.descripcion = cancha.descripcion;
    this.cancha.ancho = cancha.ancho;
    this.cancha.altura = cancha.altura;
    this.cancha.foto = cancha.foto;

    if (cancha.vacante == true) {
      this.cancha.vacante = false;

      Swal.fire({
        title: 'Desea Activar esta cancha ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Activar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Cancha Activar!',
            ':)'
          )
          this.actDesCanchas(cancha)
          this.limpiar()
          console.log(this.cancha.vacante)
        }
      })

    } else {
      this.cancha.vacante = true;

      Swal.fire({
        title: 'Desea Inactivar esta cancha ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Inactivar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Cancha Inactivar!',
            ':('
          )
          this.actDesCanchas(cancha)
          this.limpiar()
          console.log(this.cancha.vacante)
        }
      })

    }
  }

  descripcionSubcadena(cadena: string){
    this.subcadena = '';
    this.subcadena = cadena.substring(0, 10) + "...";
  }

  limpiar() {
    this.displayEU = false;
    this.cancha = new Canchas;
    this.listaCancha = [];
    this.obtenerCanchas();
  }

  actDesCanchas(cancha: Canchas) {
    this.canchasService.putCanchas(cancha, cancha.idCancha).subscribe(
      data => {
        console.log(cancha)
        console.log(cancha.idCancha)
        this.cancha.idCancha = data.idCancha;
        this.cancha = cancha;
      }
    )
    this.cancha = new Canchas;
    this.limpiar()
  }

  actualizarCanchas() {
    this.canchasService.putCanchas(this.cancha, this.cancha.idCancha).subscribe(
      data => {
        this.cancha.idCancha = data.idCancha;
        this.cancha = this.cancha;
        this.limpiar();
      }
    )
  }

  // IMAGEN
  image!: any;
  file: any = '';

  // CAPTURO EL ARCHIVO
  nombre_orignal: string = "";

  cap_nombre_archivo: any;
  selectedFile!: File;

  public imageSelected(event: any) {

    this.selectedFile = event.target.files[0];

    // mostrar imagen seleccionada
    this.image = this.selectedFile;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.file = reader.result;
    };


    // CAPTURAR EL NAME DE LA IMAGEN
    console.log("Seleciono una imagen: " + event.target.value);
    this.cap_nombre_archivo = event.target.value;
    console.log("Numero de datos del nombre del archivo => " + this.cap_nombre_archivo.length)
    this.nombre_orignal = this.cap_nombre_archivo.slice(12);
    console.log("Nombre imagen original => " + this.nombre_orignal);
    console.log(this.nombre_orignal);

  }

  cargarImagen() {
    this.fotoService.guararImagenes(this.selectedFile);
  }

}
