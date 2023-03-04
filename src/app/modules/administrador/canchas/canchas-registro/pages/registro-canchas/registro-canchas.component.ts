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
              window.location.reload();
            }
          )
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
