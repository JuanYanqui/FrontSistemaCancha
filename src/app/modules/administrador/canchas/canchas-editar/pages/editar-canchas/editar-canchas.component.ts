import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Canchas } from 'src/app/core/models/canchas';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { EstablecimientoService } from 'src/app/shared/services/establecimiento.service';
import { FotoService } from 'src/app/shared/services/foto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-canchas',
  templateUrl: './editar-canchas.component.html',
  styleUrls: ['./editar-canchas.component.css']
})
export class EditarCanchasComponent {

  listaCancha: any[] = [];

  pageActual: number = 1;
  loading: boolean = true;
  displayEU: boolean = false;
  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";

  subcadena: string = '';

  cancha: Canchas = new Canchas;
  establecimiento: Establecimiento = new Establecimiento;

  entrada:any;
  id_establ:any;

  estadoif: boolean = false;

  constructor(private toastr: ToastrService, private establecimientoService: EstablecimientoService, private fotoService: FotoService, private canchasService: CanchasService, private router: Router) {
    this.obtener();
  }

  obtener(){
    this.id_establ = localStorage.getItem('EstablecimientoID');
    this.canchasService.getByEstablecimiento(this.id_establ).subscribe(
      data=>{
        this.listaCancha = data;
        console.log(data)
      }
    )
  }
  
  editarCancha(cancha: Canchas) {
    this.displayEU = true;
    this.cancha = cancha;
  }

  darBajaCancha(canh: Canchas) {
    let title = '';

    if (!canh.vacante) {
      this.estadoif = false;
      title = 'Deshabilitado!';
    } else {
      this.estadoif = true;
      title = 'Habilitado!';
    }

    this.cancha.vacante = this.estadoif;
    this.canchasService.putCanchas(canh, canh.idCancha).subscribe(
      data => {
        Swal.fire({
          title: 'Estado de cancha actualizado correctamente!',
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
        
      }
    )
  }

  descripcionSubcadena(cadena: string) {
    this.subcadena = '';
    this.subcadena = cadena.substring(0, 10) + "...";
  }

  limpiar() {
    this.displayEU = false;
    this.cancha = new Canchas;
    this.listaCancha = [];
    this.obtener();
  }

  actualizarCanchas() {

    this.cargarImagen();

    if (this.cancha.nombre == '') { this.toastr.error("Campo nombres vacio!", "Error!"); }
    else if (this.cancha.tarifa == null) { this.toastr.error("Campo tarifa erroneo!", "Error!"); }
    else if (Number(this.cancha.tarifa) < 0) { this.toastr.error("Campo tarifa erroneo debe ser mayor a cero!!", "Error!"); }
    else if (this.cancha.descripcion == '') { this.toastr.error("Campo descripcion vacio!", "Error!"); }
    else if (this.cancha.ancho == null) { this.toastr.error("Campo ancho de cancha erroneo!", "Error!"); }
    else if (this.cancha.ancho < 0) { this.toastr.error("Campo ancho de cancha erroneo debe ser mayor a cero!", "Error!"); }
    else if (this.cancha.altura == null) { this.toastr.error("Campo alto de cancha erroneo!", "Error!"); }
    else if (this.cancha.altura < 0) { this.toastr.error("Campo alto de cancha erroneo debe ser mayor a cero!", "Error!"); }
    else{
      if (this.nombre_orignal.length != 0) { this.cancha.foto = this.nombre_orignal; }

      this.canchasService.putCanchas(this.cancha, this.cancha.idCancha).subscribe(
        data => {
          this.cancha.idCancha = data.idCancha;
          this.cancha = this.cancha;
          Swal.fire({
            title: 'Cancha actualizada correctamente!',
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
