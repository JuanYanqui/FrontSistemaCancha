import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/core/models/persona';
import { Usuario } from 'src/app/core/models/usuario';
import { FotoService } from 'src/app/shared/services/foto.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-usuarios',
  templateUrl: './edit-usuarios.component.html',
  styleUrls: ['./edit-usuarios.component.css']
})
export class EditUsuariosComponent {
  listaUsuarios: any[] = [];
  isinactivo: boolean = false;
  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";
  displayEU: boolean = false;
  blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/
  persona: Persona = new Persona;
  usuario: Usuario = new Usuario;
  pageActual: number = 1;

  totalRecords?: number;

  loading?: boolean

  selectAll: boolean = false;
  estadoif: boolean = false;

  estVerificarEmail: boolean = false;

  estVerificarContraMay: boolean = false;
  estVerificarContraMin: boolean = false;
  estVerificarContraNum: boolean = false;
  estVerificarContraCar: boolean = false;
  estVerificarContraLon: boolean = false;

  constructor(private toastr: ToastrService, private fotoService: FotoService, private personaService: PersonaService, private usuarioService: UsuarioService, private router: Router) {
    this.obtenerUsuariosPrivilegios();
  }

  onKeyPressLetras(event: KeyboardEvent) {
    const input = event.key;
    const pattern = /^[a-zA-Z\s]*$/;

    if (!pattern.test(input)) {
      event.preventDefault();
    }
  }

  validarCorreoElectronico(correo: string) {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.estVerificarEmail = emailPattern.test(correo);
  }

  darBajaUsuario(usuario: Usuario) {
    let title = '';

    if (!usuario.estado) {
      this.estadoif = false;
      title = 'Deshabilitado!';
      console.log(title);
    } else {
      this.estadoif = true;
      title = 'Habilitado!';
      console.log(title);
    }

    this.usuario.estado = this.estadoif;
    console.log(this.usuario.estado);
    this.usuarioService.updateUsuario(usuario, usuario.idUsuario).subscribe(
      data => {
        Swal.fire({
          title: 'Estado de usuario actualizado correctamente!',
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

  validarContrasena(contra: string) {

    this.estVerificarContraMin = false;
    this.estVerificarContraMay = false;
    this.estVerificarContraNum = false;
    this.estVerificarContraCar = false;
    this.estVerificarContraLon = false;

    const contraPattern1: RegExp = /^(?=.*[a-z]).+$/g;
    const contraPattern2: RegExp = /^(?=.*[A-Z]).+$/g;
    const contraPattern3: RegExp = /[0-9]+/;
    const contraPattern4: RegExp = /.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/;

    if (contraPattern1.test(contra)) {
      this.estVerificarContraMin = true;
    }

    if (contraPattern2.test(contra)) {
      this.estVerificarContraMay = true;
    }

    if (contraPattern3.test(contra)) {
      this.estVerificarContraNum = true;
    }

    if (contraPattern4.test(contra)) {
      this.estVerificarContraCar = true;
    }

    if (contra.length >= 8) {
      this.estVerificarContraLon = true;
    }
  }

  actualizarUsuario() {

    this.validarContrasena(this.usuario.password)
    this.validarCorreoElectronico(String(this.persona.email));
    this.cargarImagen()

    if (this.persona.nombre?.length === 0) { this.toastr.error("Campo nombre erroneo", "Error!"); }
    else if (this.persona.apellido?.length === 0) { this.toastr.error("Campo apellido erroneo", "Error!"); }
    else if (this.estVerificarEmail == false || this.persona.email?.length === 0) { this.toastr.error("Campo email erroneo", "Error!"); }
    else if (this.persona.genero?.length === 0) { this.toastr.error("Campo genero erroneo", "Error!"); }
    else if (this.persona.direccion == null || this.persona.direccion == '') { this.toastr.error("Campo direccion erroneo", "Error!"); }
    else if (this.persona.telefono?.length != 11 || this.persona.telefono == '0_-___-____') { this.toastr.error("Campo telefono erroneo", "Error!"); }
    else if (this.persona.celular?.length != 11) { this.toastr.error("Campo celular erroneo", "Error!"); }
    else if (this.usuario.username.length === 0 || this.usuario.username.length < 4) { this.toastr.error("Campo username erroneo", "Error!"); }
    else if (this.usuario.password.length === 0 || this.usuario.password.length < 5) { this.toastr.error("Campo contrase;a erroneo", "Error!"); }
    else if (this.usuario.username.length === 0 || this.usuario.username.length < 4) { this.toastr.error("Campo username erróneo", "Error!"); }
    else if (this.usuario.password.length == 0) { this.toastr.error("La contraseña no cumple con lo rrequerido", "Error!"); }
    else if (this.estVerificarContraMin == false) { this.toastr.error("La contraseña debe tener minimo una minuscula", "Error!"); }
    else if (this.estVerificarContraMay == false) { this.toastr.error("La contraseña debe tener minimo una mayuscula", "Error!"); }
    else if (this.estVerificarContraNum == false) { this.toastr.error("La contraseña debe tener minimo un digito", "Error!"); }
    else if (this.estVerificarContraCar == false) { this.toastr.error("La contraseña debe tener minimo un caracter especial", "Error!"); }
    else if (this.estVerificarContraLon == false) { this.toastr.error("La contraseña debe tener un minimo tamaño de 8 caracteres", "Error!"); }
    else {
      if (this.nombre_orignal.length != 0) { this.persona.foto = this.nombre_orignal; }
      this.personaService.updatePersona(this.persona, this.persona.cedula).subscribe(
        data => {
          this.persona.cedula = data.cedula;
          this.usuario.persona = this.persona;

          this.usuarioService.updateUsuario(this.usuario, this.usuario.idUsuario).subscribe(
            result => {
              Swal.fire({
                title: 'Usuario actualizado correctamente!',
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
                  this.goToR()
                }
              })
            }
          )
        }
      )
    }
  }

  limpiar() {
    this.displayEU = false;
    this.persona = new Persona;
    this.usuario = new Usuario;

    this.loading = true;
    this.listaUsuarios = [];
    this.obtenerUsuariosPrivilegios();
  }

  goToR(){
    this.router.navigate(['/edit-usuarioadmin'])
  }


  obtenerUsuariosPrivilegios() {
    this.usuarioService.getUsuarios().subscribe(
      data => {
        this.listaUsuarios = data;
      }
    );
  }
  editarUsuario(usuario: Usuario) {

    this.displayEU = true;


    this.persona.apellido = usuario.persona?.apellido;
    this.persona.nombre = usuario.persona?.nombre;
    this.persona.celular = usuario.persona?.celular;
    this.persona.email = usuario.persona?.email;
    this.persona.direccion = usuario.persona?.direccion;
    this.persona.fechaNacimmiento = usuario.persona?.fechaNacimmiento;
    this.persona.genero = usuario.persona?.genero;
    this.persona.idPersona = usuario.persona?.idPersona;
    this.persona.telefono = usuario.persona?.telefono;
    this.persona.cedula = usuario.persona?.cedula;
    this.persona.foto = usuario.persona?.foto;

    this.usuario.rol = usuario.rol;
    this.usuario.estado = usuario.estado;
    this.usuario.idUsuario = usuario.idUsuario;
    this.usuario.password = usuario.password;
    this.usuario.username = usuario.username;

  }


  solicitar() {

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
