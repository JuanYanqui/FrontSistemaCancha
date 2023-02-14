import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { Canchas } from 'src/app/core/models/canchas';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { EstablecimientoService } from 'src/app/shared/services/establecimiento.service';
import { FotoService } from 'src/app/shared/services/foto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-canchas',
  templateUrl: './registro-canchas.component.html',
  styleUrls: ['./registro-canchas.component.css']
})
export class RegistroCanchasComponent {

  cancha: Canchas = new Canchas;
  establecimiento: Establecimiento = new Establecimiento;


  blockSpecial: RegExp = /^[^<>*!]+$/
  date: Date = new Date("2018-03-16");
  verfNombres: any;
  verfDescripcion: any;
  verftarifa: any;
  verfancho: any;
  verfalto: any;


  constructor(private cargarScripts: CargarScriptsService, private toastr: ToastrService, private fotoService: FotoService, private establecimientoService: EstablecimientoService, private canchasService: CanchasService, private router: Router) {
    cargarScripts.Carga(["register-canchas.component"])
  }


  ngOnInit(): void {
    this.cancha.nombre = '';
    this.cancha.descripcion = '';
    this.cancha.tarifa = '';
    this.cancha.ancho = 0;
    this.cancha.altura = 0;

  }

  registrarCancha() {

    if (this.cancha.nombre == null || this.cancha.nombre.length == 0) {
      this.verfNombres = 'ng-invalid ng-dirty';
      this.toastr.error("Campo nombres vacio!", "Error!");
    }

    if (this.cancha.descripcion == null || this.cancha.descripcion.length == 0) {
      this.verfDescripcion = 'ng-invalid ng-dirty';
      this.toastr.error("Campo descripcion vacio!", "Error!");
    }

    if (this.cancha.tarifa == null || this.cancha.tarifa.length == 0) {
      this.verftarifa = 'ng-invalid ng-dirty';
      this.toastr.error("Campo tarifa vacio!", "Error!");
    }


    if (this.cancha.ancho === 0 || this.cancha.ancho === null) {
      this.verfancho = 'ng-invalid ng-dirty';
      this.toastr.error("Campo ancho de cancha debe ser mayor a cero!", "Error!");
    }

    if (this.cancha.altura === 0 || this.cancha.altura === null) {
      this.verfalto = 'ng-invalid ng-dirty';
      this.toastr.error("Campo alto de cancha debe ser mayor a cero!", "Error!");
    }

    if (this.cancha.nombre === '' || this.cancha.descripcion === '' || this.cancha.tarifa === '' || this.cancha.ancho === 0 || this.cancha.altura === 0
      || this.cancha.nombre === null || this.cancha.descripcion === null || this.cancha.tarifa === null || this.cancha.ancho === null || this.cancha.altura === null) {

      this.toastr.warning("Verifique que esten correctos los campos")
    } else {
      this.canchasService.postCanchas(this.cancha).subscribe(
        data => {
          console.log(data);
          this.cancha.nombre = data.nombre;
          this.cancha.tarifa = data.tarifa;
          this.cancha.ancho = data.ancho;
          this.cancha.altura = data.altura;
          this.cancha.descripcion = data.descripcion;
          this.cancha.vacante = true;
          this.cancha.foto = this.nombre_orignal;

          this.establecimiento.idEstablecimiento = 1;

          this.cancha.establecimiento = this.establecimiento;

        }
      )

      //this.ngOnInit();
      Swal.fire("La cancha se creo exitosamente")
    }
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
