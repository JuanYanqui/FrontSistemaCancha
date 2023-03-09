import { Component } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { Ubicacion } from 'src/app/core/models/ubicacion';
import { EstablecimientoService } from 'src/app/shared/services/establecimiento.service';
import { FotoService } from 'src/app/shared/services/foto.service';
import { UbicacionService } from 'src/app/shared/services/ubicacion.sevice';
import { MouseEvent as MapMouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from 'src/app/core/models/persona';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { Usuario } from 'src/app/core/models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-establecimiento',
  templateUrl: './registrar-establecimiento.component.html',
  styleUrls: ['./registrar-establecimiento.component.css']
})
export class RegistrarEstablecimientoComponent {
  lat: number;
  long: number;
  zoom: number;
  isButtonEnabled2: boolean = false;
  mapTypeId: string;

  city: string = "";
  country: string = "";
  mainStreet: string = "";
  secondaryStreet: string = "";

  persona: Persona = new Persona;
  usuario: Usuario = new Usuario;
  flapersona: boolean = true;
  establecimiento: Establecimiento = new Establecimiento;
  ubicacion: Ubicacion = new Ubicacion;

  latu: number = 0;
  longu: number = 0;

  listafoto: any[] = [];
  listafile: File[] = [];

  hasBarControl = new FormControl(false);
  hasEstacionamientoControl = new FormControl(false);
  hasbanioControl = new FormControl(false);
  hasVestidirControl = new FormControl(false);
 
  ao1: String = '';
  ao2: String = '';
  estHora: Boolean = false;
  VALMensajeUsuario: boolean = false;
  valcedula: boolean = false;

  constructor(private cargarScripts: CargarScriptsService, private personaService: PersonaService, private http: HttpClient, private toast: ToastrService, private establecimientoService: EstablecimientoService, private ubicacionService: UbicacionService, private usuarioService: UsuarioService, private fotoService: FotoService) {
    this.lat = -1.831239;
    this.long = -78.183406;
    this.zoom = 6;
    this.mapTypeId = 'hybrid';
    cargarScripts.Carga(["establecimiento-foto.component"])

  }

  checkHasBar() {
    if (this.hasBarControl.value) {
      console.log('Does not have bar');
      this.establecimiento.bar = false;
      console.log(this.establecimiento.bar);
    } else {
      console.log('Has bar');
      this.establecimiento.bar = true;
      console.log(this.establecimiento.bar);

    }
  }

  checkHasEsta() {
    if (this.hasEstacionamientoControl.value) {
      console.log('Does not have esta');
      this.establecimiento.estacionamiento = false;
      console.log(this.establecimiento.estacionamiento);
    } else {
      console.log('Has esta');
      this.establecimiento.estacionamiento = true;
      console.log(this.establecimiento.estacionamiento);

    }
  }

  checkHasBanio() {
    if (this.hasbanioControl.value) {
      console.log('Does not have banio');
      this.establecimiento.banios = false;
      console.log(this.establecimiento.banios);
    } else {
      console.log('Has banio');
      this.establecimiento.banios = true;
      console.log(this.establecimiento.banios);

    }
  }

  checkHasVesti() {
    if (this.hasVestidirControl.value) {
      console.log('Does not have vesti');
      this.establecimiento.vestidores = false;
      console.log(this.establecimiento.vestidores);
    } else {
      console.log('Has vesti');
      this.establecimiento.vestidores = true;
      console.log(this.establecimiento.vestidores);

    }
  }

  getCoordinates(event: MapMouseEvent) {
    this.lat = event.coords.lat;
    console.log(this.lat)
    this.long = event.coords.lng;
    console.log(this.long)
    // this.getLocationData(this.latu, this.longu);
    // this.geocodeAddress(this.latu, this.longu);
    this.ubicacion.latitud = this.lat;
    console.log(this.ubicacion.latitud)
    this.ubicacion.longitud = this.long;
    console.log(this.ubicacion.longitud)
  }

  buscarPorCedula() {
    if (this.persona.cedula != null && this.persona.cedula != '') {

      this.usuarioService.getUsuarios().subscribe(
        datausuario => {
          for (let a = 0; a < datausuario.length; a++) {
            if (datausuario[a].persona.cedula == this.persona.cedula && datausuario[a].rol?.nombre == 'ADMINISTRADOR') {
              this.valcedula = true;
              this.personaService.getPorCedula(this.persona.cedula).subscribe(
                data => {
                  console.log(data);
                  if (data != null) {
                    this.VALMensajeUsuario = true;
                    this.toast.success('Dato encontrado en a base');
                    this.flapersona = false;

                    this.persona.apellido = data.apellido;
                    this.persona.cedula = data.cedula;
                    this.persona.idPersona = data.idPersona;
                    this.persona.nombre = data.nombre;
                    this.persona.genero = data.genero;
                    this.persona.direccion = data.direccion;
                    this.persona.celular = data.celular;
                    this.persona.email = data.email;
                    this.persona.foto = data.foto;
                    this.persona.fechaNacimmiento = data.fechaNacimmiento;
                    this.persona.telefono = data.telefono

                  } else if (this.persona.cedula?.length == 10) {
                    this.flapersona = true;

                    this.toast.info('La cedula ingresada no esta registrada en el sistema', 'Cedula no encontrada')
                  } else if (this.persona.cedula?.length == 0) {
                    this.toast.info('La cedula ingresada no cumple con el numero de extensión')
                  } else if (this.persona.cedula?.length == 11) {
                    this.toast.info('La cedula ingresada no cumple con el numero de extensión')
                  }
                }
              )
            } else {
              this.valcedula = false;
              this.VALMensajeUsuario = false;
            }
          }
        }
      )

      if (this.VALMensajeUsuario == false) {
        this.toast.warning('La cedula debe ser de un administrador', 'Advertencia!')
      }
    } else {
      this.toast.warning('Cedula incorrecta', 'Advertencia!')
    }

  }

  validarFecha() {
    this.ao1 = String(this.establecimiento.horaApertura);
    this.ao1 = this.ao1[0] + this.ao1[1]
    this.ao2 = String(this.establecimiento.horaCierre);
    this.ao2 = this.ao2[0] + this.ao2[1]

    if (Number(this.ao1) != Number(this.ao2)) {
      this.estHora = true;
    } else {
      this.estHora = false;
    }
  }

  registrarEstablecimiento() {

    this.validarFecha();
    this.establecimiento.fotoestablecimiento = this.nombre_orignal;
    this.cargarImagen();

    if (typeof this.ubicacion.latitud === 'undefined' || typeof this.ubicacion.longitud === 'undefined') { this.toast.error("Ubicacion no seleccionada", "Error!"); }
    else if (typeof this.ubicacion.calle_principal === 'undefined') { this.toast.error("Campo calle principal erroneo", "Error!"); }
    else if (typeof this.ubicacion.calle_secundaria === 'undefined') { this.toast.error("Campo calle secundaria erroneo", "Error!"); }
    else if (typeof this.ubicacion.referencia === 'undefined') { this.toast.error("Campo referencia erroneo", "Error!"); }
    else if (typeof this.ubicacion.numero === 'undefined') { this.toast.error("Campo numero de propiedad erroneo", "Error!"); }
    else if (this.persona.cedula == '' || this.persona.nombre == '' || this.persona.apellido == '') { this.toast.error("Campo cedula erroneo!", "Error!"); }
    else if (this.establecimiento.ruc == '' || String(this.establecimiento.ruc).length != 13) { this.toast.error("Campo ruc erroneo", "Error!"); }
    else if (this.establecimiento.nombre == '') { this.toast.error("Campo nombre de establecimiento erroneo", "Error!"); }
    else if (typeof this.establecimiento.horaApertura === 'undefined') { this.toast.error("campos hora de apertura erroneo", "Error!"); }
    else if (typeof this.establecimiento.horaCierre === 'undefined') { this.toast.error("campos hora de cierre erroneo", "Error!"); }
    else if (this.estHora == false) { this.toast.error("campos hora no pueden ser iguales", "Error!"); }
    else if (this.establecimiento.fotoestablecimiento?.length === 0) { this.toast.error("Campo foto erroneo", "Error!"); }
    else {
      this.ubicacionService.postUbicacion(this.ubicacion).subscribe(
        data => {
          this.ubicacion.idUbicacion = data.idUbicacion;
          this.toast.success("creado ubicacion")
          console.log(data);
          if (!data) {

          } else {
            console.log(data);
            this.establecimiento.ubicacion = this.ubicacion;
            // this.establecimiento.fotoestablecimiento = [this.fotoestablecimiento]; 
            this.establecimiento.persona = this.persona

            this.establecimientoService.postEstablecimiento(this.establecimiento).subscribe(
              result => {
                Swal.fire({
                  title: 'Establecimiento registrado correctamente!',
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
                    this.limpiarE();
                    this.goToR()
                  }
                })
              }

            )
          }
        }
      )
    }

  }

  goToR() {
    window.location.reload();
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
    //   this.listafile.push(this.selectedFile);
    //   this.listafile.forEach(datos=> {
    //     // console.log("MI lista Files-> " + datos);
    // });


    // CAPTURAR EL NAME DE LA IMAGEN
    console.log("Seleciono una imagen: " + event.target.value);
    this.cap_nombre_archivo = event.target.value;
    console.log("Numero de datos del nombre del archivo => " + this.cap_nombre_archivo.length)
    this.nombre_orignal = this.cap_nombre_archivo.slice(12);
    console.log("Nombre imagen original => " + this.nombre_orignal);
    console.log(this.nombre_orignal);
    // this.listafoto.push(this.nombre_orignal);
    // this.listafoto.forEach(datos=> {
    // });

  }

  cargarImagen() {
    this.fotoService.guararImagenes(this.selectedFile);
  }


  limpiarE() {

    this.establecimiento.nombre = "";
    this.establecimiento.horaApertura = new Date;
    this.establecimiento.horaCierre = new Date;
    this.ubicacion.calle_principal = "";
    this.ubicacion.calle_secundaria = "";

    this.ubicacion.latitud = 0;
    this.ubicacion.longitud = 0;
    this.ubicacion.numero = 0;

    this.ubicacion.referencia = 0;
    this.establecimiento.banios = false;
    this.establecimiento.bar = false;
    this.establecimiento.estacionamiento = false;
    this.establecimiento.vestidores = false;

    this.establecimiento.fotoestablecimiento = "";
    window.location.reload();
  }



}
