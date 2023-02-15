import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { Cancha } from 'src/app/core/models/cancha';
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

  cancha: Cancha = new Cancha;
  establecimiento: Establecimiento = new Establecimiento;
  listestablecimientos: any[] = [];

  blockSpecial: RegExp = /^[^<>*!]+$/
  date: Date = new Date("2018-03-16");
  verfNombres: any;
  verfDescripcion: any;
  verftarifa: any;
  verfancho: any;
  verfalto: any;
  idEst: number = 0;


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

    /*if (this.cancha.nombre == null || this.cancha.nombre.length == 0) {
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
    } else {*/
    this.obtestable();
      this.canchasService.postCanchas(this.cancha).subscribe(
        data => {
          this.cancha.nombre = data.nombre;
          this.cancha.descripcion = data.descripcion;
          this.cancha.tarifa = data.tarifa;
          this.cancha.altura = data.altura;
          this.cancha.ancho = data.ancho;
          this.cancha.vacante = true;
          this.cancha.foto = this.nombre_orignal;
          
          this.establecimientoService.getEstablecimiento().subscribe(
            data => {
              console.log(data);
              
              for(let a = 0 ; a < data.length ; a++){
                if(data[a].persona?.idPersona == Number(localStorage.getItem("localIdPersona"))){
                  this.establecimiento.idEstablecimiento = data[a].idEstablecimiento;
                  this.establecimiento.ruc = data[a].ruc;
                  this.establecimiento.nombre = data[a].nombre;
                  this.establecimiento.puntuacion = data[a].puntuacion;
                  this.establecimiento.horaApertura = data[a].horaApertura;
                  this.establecimiento.horaCierre = data[a].horaCierre;
                  this.establecimiento.bar = data[a].bar;
                  this.establecimiento.estacionamiento = data[a].estacionamiento;
                  this.establecimiento.vestidores = data[a].vestidores;
                  this.establecimiento.banios = data[a].banios;
                  this.establecimiento.estado = data[a].estado;
                  this.establecimiento.provincia = data[a].provincia;
                  this.establecimiento.ciudad = data[a].ciudad;
                  this.establecimiento.direccion = data[a].direccion;
                  this.establecimiento.codigoPostal = data[a].codigoPostal;
                  this.establecimiento.fotoestablecimiento = data[a].fotoestablecimiento;
                  this.establecimiento.persona = data[a].persona;
                  this.establecimiento.ubicacion = data[a].ubicacion;
                }
              }
            }
          )
          this.cancha.establecimiento = this.establecimiento;
          console.log(this.cancha)
          console.log(this.establecimiento)
        }
      )



      //this.ngOnInit();
      Swal.fire("La cancha se creo exitosamente")
    //}
  }


  obtestable(){
    this.establecimientoService.getEstablecimiento().subscribe(
      data => {
        console.log(data);
        
        for(let a = 0 ; a < data.length ; a++){
          if(data[a].persona?.idPersona == Number(localStorage.getItem("localIdPersona"))){
            this.idEst = data[a].idEstablecimiento;
            console.log(this.idEst);
          }
        }
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
