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

  canchas: Canchas = new Canchas;
  establecimiento: Establecimiento = new Establecimiento;
  listestablecimientos: any[] = [];

  blockSpecial: RegExp = /^[^<>*!]+$/

  verfNombres: any;
  verfDescripcion: any;
  verftarifa: any;
  verfancho: any;
  verfalto: any;

  idEst: number = 0;

  creareliminar: boolean = false;
  estVerificarTarifa: boolean = false;

  id_personaIsLoggin:any;
  id_establ:any;

  constructor(private cargarScripts: CargarScriptsService, private toastr: ToastrService, private fotoService: FotoService, private establecimientoService: EstablecimientoService, private canchasService: CanchasService, private router: Router) {
    cargarScripts.Carga(["registro-canchas.component"])
  }

  ngOnInit(): void {
    this.canchas.nombre = "";
    this.canchas.descripcion = "";
    this.canchas.tarifa = "";
    this.canchas.foto = "";
    this.canchas.ancho = 0;
    this.canchas.altura = 0;

    this.id_personaIsLoggin = localStorage.getItem('localIdPersona');
    this.id_establ = localStorage.getItem('EstablecimientoID');
 

  }

  validarTarifa(tari: string) {
    const tarifaPattern: RegExp = /^[0-9]+(\.[0-9]+)?$/;
    this.estVerificarTarifa = tarifaPattern.test(tari);
  }

  
  registrar(){
    this.validarTarifa(this.canchas.tarifa);
    this.canchas.foto = this.nombre_orignal;
    this.cargarImagen();

    if (this.canchas.nombre.length === 0) { this.toastr.error("Campo nombres vacio!", "Error!"); }
    else if (this.estVerificarTarifa == false) { this.toastr.error("Campo tarifa erroneo ejem: 12.2!", "Error!"); }
    else if (this.canchas.descripcion.length === 0) { this.toastr.error("Campo descripcion vacio!", "Error!"); }
    else if (String(this.canchas.ancho).length === 0) { this.toastr.error("Campo ancho de cancha debe ser mayor a cero!", "Error!"); }
    else if (String(this.canchas.altura).length === 0) { this.toastr.error("Campo alto de cancha debe ser mayor a cero!", "Error!"); }
    else if (this.canchas.foto.length === 0) { this.toastr.error("Campo foto vacio!", "Error!"); }
    else{
      this.establecimientoService.getPorId(this.id_establ).subscribe(
        data=>{
          this.canchas.establecimiento = data;
          
          this.canchasService.postCanchas(this.canchas).subscribe(
            x=>{
              Swal.fire("La canchas se creo exitosamente")
              this.ngOnInit();
            }
          )
        }
      )
    }
  }

  registrarCancha() {

    if (this.canchas.nombre == null || this.canchas.nombre.length == 0) {
      this.verfNombres = 'ng-invalid ng-dirty';
      this.toastr.error("Campo nombres vacio!", "Error!");
    }

    if (this.canchas.descripcion == null || this.canchas.descripcion.length == 0) {
      this.verfDescripcion = 'ng-invalid ng-dirty';
      this.toastr.error("Campo descripcion vacio!", "Error!");
    }

    if (this.canchas.tarifa == null || this.canchas.tarifa.length == 0) {
      this.verftarifa = 'ng-invalid ng-dirty';
      this.toastr.error("Campo tarifa vacio!", "Error!");
    }


    if (this.canchas.ancho === 0 || this.canchas.ancho === null) {
      this.verfancho = 'ng-invalid ng-dirty';
      this.toastr.error("Campo ancho de cancha debe ser mayor a cero!", "Error!");
    }

    if (this.canchas.altura === 0 || this.canchas.altura === null) {
      this.verfalto = 'ng-invalid ng-dirty';
      this.toastr.error("Campo alto de cancha debe ser mayor a cero!", "Error!");
    }

    if (this.canchas.nombre === '' || this.canchas.descripcion === '' || this.canchas.tarifa === '' || this.canchas.ancho === 0 || this.canchas.altura === 0
      || this.canchas.nombre === null || this.canchas.descripcion === null || this.canchas.tarifa === null || this.canchas.ancho === null || this.canchas.altura === null) {

      this.toastr.warning("Verifique que esten correctos los campos")
    } else {
      this.establecimientoService.getEstablecimiento().subscribe(
        data => {

          for (let a = 0; a < data.length; a++) {
            if (data[a].persona?.idPersona == Number(localStorage.getItem("localIdPersona"))) {
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
          this.canchas.establecimiento = this.establecimiento;

          this.canchas.foto = this.nombre_orignal;
          this.canchasService.postCanchas(this.canchas).subscribe(
          data => {
            this.canchas.idCancha = data.idCancha;
            this.canchas.nombre = data.nombre;
            this.canchas.descripcion = data.descripcion;
            this.canchas.tarifa = data.tarifa;
            this.canchas.altura = data.altura;
            this.canchas.ancho = data.ancho;
            this.canchas.vacante = true;
            localStorage.setItem('idCancha', String(this.canchas.idCancha));

            /*if(this.nombre_orignal == null || this.nombre_orignal == ''){
              this.nombre_orignal = 
            }*/

            Swal.fire("La canchas se creo exitosamente")

            this.ngOnInit();
            this.cargarImagen();
          })
        }
      )
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
