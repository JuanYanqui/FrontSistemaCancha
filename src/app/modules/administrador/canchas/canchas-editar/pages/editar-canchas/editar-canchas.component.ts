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
  cancha: Canchas = new Canchas;
  blockSpecial: RegExp = /^[^<>*!]+$/
  pageActual: number = 1;
  displayEU: boolean = false;
  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";
  subcadena: string = '';
  entrada:any;
  establecimiento: Establecimiento = new Establecimiento;
  id_establ:any;
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


  obtenerCanchas() {
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

        this.entrada = this.establecimiento.idEstablecimiento;
        this.canchasService.getByEstablecimiento( this.entrada).subscribe(
          data => {
            this.listaCancha = data;
            console.log(data)
          }
        );


      }

    )
  }













  //   let idCancha = localStorage.getItem("localCancha");
  //   this.canchasService.getPorId(idCancha).subscribe( 
  //     data => {
  //     this.establecimiento = data.establecimiento!;

  //     console.log("id establecimiento: "+this.establecimiento);
  //     this.canchasService.getByEstablecimiento(this.establecimiento).subscribe(
  //       data => {
  //         this.listaCancha = data;
  //         console.log(data)
  //       }
  //     );
  //   }
  // )



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

  descripcionSubcadena(cadena: string) {
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
