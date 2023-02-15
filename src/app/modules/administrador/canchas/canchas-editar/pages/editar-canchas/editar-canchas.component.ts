import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cancha } from 'src/app/core/models/cancha';
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
  cancha: Cancha = new Cancha;
  blockSpecial: RegExp = /^[^<>*!]+$/
  pageActual: number = 1;
  displayEU: boolean = false;
  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";


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

  editarCancha(cancha: Cancha) {

    this.displayEU = true;

    this.cancha.idCancha = cancha.idCancha;
    this.cancha.nombre = cancha.nombre;
    this.cancha.tarifa = cancha.tarifa;
    this.cancha.descripcion = cancha.descripcion;
    this.cancha.ancho = cancha.ancho;
    this.cancha.altura = cancha.altura;
    this.cancha.foto = cancha.foto;
  }

  ActDesCancha(cancha: Cancha) {
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
          this.actualizarCanchas()
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
          this.actualizarCanchas()
          console.log(this.cancha.vacante)
        }
      })

    }
  }

  limpiar() {
    this.displayEU = false;
    this.cancha = new Cancha;
    this.listaCancha = [];
    this.obtenerCanchas();
  }

  actualizarCancha(cancha: Cancha) {
    this.canchasService.putCanchas(cancha, cancha.idCancha).subscribe(
      data => {
        console.log(cancha)
        console.log(cancha.idCancha)
        this.cancha.idCancha = data.idCancha;
        this.cancha = cancha;
      }
    )
    this.cancha = new Cancha;
    this.limpiar()
  }

  actualizarCanchas() {
    this.canchasService.putCanchas(this.cancha, this.cancha.idCancha).subscribe(
      data => {
        this.cancha.idCancha = data.idCancha;
        this.cancha = this.cancha;
      }
    )
    this.cancha = new Cancha;
    this.limpiar()
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
