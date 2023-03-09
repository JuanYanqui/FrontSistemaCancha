import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/core/models/persona';
import { Rol } from 'src/app/core/models/roles';
import { Usuario } from 'src/app/core/models/usuario';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import Swal from 'sweetalert2';
import { FotoService } from 'src/app/shared/services/foto.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  rol: Rol = new Rol;
  persona: Persona = new Persona;
  usuario: Usuario = new Usuario;

  flapersona: boolean = true;
  isButtonEnabled: boolean = false;
  isButtonEnabled2: boolean = false;

  estVerificarCedula: boolean = false;
  estVerificarEmail: boolean = false;
  estFechaNacimiento: boolean = false;

  estVerificarContraMay: boolean = false;
  estVerificarContraMin: boolean = false;
  estVerificarContraNum: boolean = false;
  estVerificarContraCar: boolean = false;
  estVerificarContraLon: boolean = false;

  ao1: string = '';
  ao2: string = '';

  constructor(private cargarScripts: CargarScriptsService, private fotoService: FotoService, private toastr: ToastrService, private personaService: PersonaService, private usuarioService: UsuarioService, private rolService: RolesService, private router: Router) {
    cargarScripts.Carga(["register-user.component"]);
  }

  ngOnInit(): void {
    this.persona = new Persona;
    this.usuario = new Usuario;
    localStorage.removeItem('idUsuario');
    sessionStorage.removeItem('productosPedido');
  }


  onKeyPressLetras(event: KeyboardEvent) {
    const input = event.key;
    const pattern = /^[a-zA-Z\s]*$/;

    if (!pattern.test(input)) {
      event.preventDefault();
    }
  }

  validarCedula(ced: string) {
    this.personaService.valCedula(ced).subscribe(
      data => {
        if (data == false && ced.length == 10) {
          this.estVerificarCedula = false;
        } else {
          this.estVerificarCedula = true;
        }
      }
    )
  }

  validarCorreoElectronico(correo: string) {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.estVerificarEmail = emailPattern.test(correo);
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

  validarFecha() {
    this.ao1 = String(new Date());
    this.ao1 = this.ao1[11] + this.ao1[12] + this.ao1[13] + this.ao1[14];
    this.ao2 = String(new Date(String(this.persona.fechaNacimmiento)));
    this.ao2 = this.ao2[11] + this.ao2[12] + this.ao2[13] + this.ao2[14];

    let f1: number = Number(this.ao1);
    let f2: number = Number(this.ao2);

    let res: number = f1 - f2;
    if (res >= 18) {
      this.estFechaNacimiento = true;
    } else {
      this.estFechaNacimiento = false;
    }
  }

  disablebtn() {
    const button = document.getElementById("btnregistrarpersona") as HTMLButtonElement;
    button.disabled = true;
  }

  recargar(): void {
    this.router.navigate(['/login-usr'])
  }


  buscarPorCedula() {
    if (this.persona.cedula != null && this.persona.cedula != '') {
      this.personaService.getPorCedula(this.persona.cedula).subscribe(
        data => {
          console.log(data);
          if (data != null) {

            this.flapersona = false;

            this.persona.apellido = data.apellido;
            this.persona.cedula = data.cedula;
            this.persona.idPersona = data.idPersona;
            this.persona.nombre = data.nombre;
            this.persona.genero = data.genero;
            this.persona.direccion = data.direccion;
            this.persona.celular = data.celular;
            this.persona.email = data.email;
            this.persona.telefono = data.telefono
            this.persona.foto = data.foto;
            this.persona.fechaNacimmiento = data.fechaNacimmiento;

          } else if (this.persona.cedula?.length == 10) {
            this.flapersona = true;

            this.toastr.info('La cedula ingresada no esta registrada en el sistema', 'Cedula no encontrada')
          } else if (this.persona.cedula?.length == 0) {
            this.toastr.info('La cedula ingresada no cumple con el numero de extensión')
          } else if (this.persona.cedula?.length == 11) {
            this.toastr.info('La cedula ingresada no cumple con el numero de extensión')
          }
        }
      )
    } else {
      this.toastr.warning('Cedula incorrecta', 'Advertencia!')
      Swal.fire('Cedula incorrecta', 'Advertencia!')
    }

  }

  registrarPersona() {

    this.validarCedula(String(this.persona.cedula));
    this.validarCorreoElectronico(String(this.persona.email));
    this.persona.foto = this.nombre_orignal;
    this.validarFecha();
    this.cargarImagen();

    if (this.estVerificarCedula == false || this.persona.cedula?.length != 10) { this.toastr.error("Campo cédula erróneo", "Error!"); }
    else if (this.persona.nombre?.length === 0) { this.toastr.error("Campo nombre erróneo", "Error!"); }
    else if (this.persona.apellido?.length === 0) { this.toastr.error("Campo apellido erróneo", "Error!"); }
    else if (this.estVerificarEmail == false || this.persona.email?.length === 0) { this.toastr.error("Campo email erróneo", "Error!"); }
    else if (this.estFechaNacimiento == false || String(this.persona.fechaNacimmiento).length === 0) { this.toastr.error("Campo fecha erróneo", "Error!"); }
    else if (typeof this.persona.genero === 'undefined') { this.toastr.error("Campo genero erróneo", "Error!"); }
    else if (this.persona.telefono?.length != 11 || typeof this.persona.telefono === 'undefined') { this.toastr.error("Campo teléfono erróneo", "Error!"); }
    else if (this.persona.celular?.length != 11 || typeof this.persona.celular === 'undefined') { this.toastr.error("Campo celular erróneo", "Error!"); }
    else if (this.persona.foto?.length === 0) { this.toastr.error("Campo foto erróneo", "Error!"); }
    else {

      this.personaService.getPorCedula(this.persona.cedula).subscribe(
        data => {
          console.log(data);
          if (data != null) {
            Swal.fire({
              title: 'La cedula ingresada ya a sido ingresada',
              text: "Desea continuar con este registro",
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Continuar!',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            }).then((result) => {
              if (result.isConfirmed) {
                this.isButtonEnabled = true;
                Swal.fire(
                  'PROCESO',
                  'CON EXITO',
                  'success'
                )
              }
            })


          } else {
            this.personaService.postPersona(this.persona).subscribe(
              data => {
                console.log(data);
                Swal.fire({
                  title: 'Persona registrada correctamente!',
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
                    this.disablebtn()
                    this.isButtonEnabled = true;
                  }
                })
              }
            );
          }
        }

      )
    }
    this.isButtonEnabled = true;
  }

  registrarUsuario() {

    this.validarContrasena(this.usuario.password)

    if (this.usuario.username.length === 0 || this.usuario.username.length < 4) { this.toastr.error("Campo username erróneo", "Error!"); }
    else if (this.usuario.password.length == 0) { this.toastr.error("La contraseña no cumple con lo rrequerido", "Error!"); }
    else if (this.estVerificarContraMin == false) { this.toastr.error("La contraseña debe tener minimo una minuscula", "Error!"); }
    else if (this.estVerificarContraMay == false) { this.toastr.error("La contraseña debe tener minimo una mayuscula", "Error!"); }
    else if (this.estVerificarContraNum == false) { this.toastr.error("La contraseña debe tener minimo un digito", "Error!"); }
    else if (this.estVerificarContraCar == false) { this.toastr.error("La contraseña debe tener minimo un caracter especial", "Error!"); }
    else if (this.estVerificarContraLon == false) { this.toastr.error("La contraseña debe tener un minimo tamaño de 8 caracteres", "Error!"); }
    else {
      this.usuarioService.verfUsername(this.usuario.username).subscribe(
        data => {
          if (!data) {
            this.personaService.getPorCedula(this.persona.cedula).subscribe(
              data => {
                console.log(data);
                this.persona.idPersona = data.idPersona;
                this.usuario.persona = this.persona;
                this.usuario.estado = true;

                this.rolService.getByName('CLIENTE').subscribe(
                  data => {
                    console.log(data);
                    this.rol.descripcion = data.descripcion;
                    this.rol.idRol = data.idRol;
                    this.rol.nombre = data.nombre;

                    this.usuario.rol = this.rol;
                    this.usuarioService.postUsuario(this.usuario).subscribe(
                      result => {
                        console.log(result);
                        this.usuario = result;
                        this.isButtonEnabled2 = true;
                        localStorage.setItem('idUsuario', String(this.usuario.idUsuario));
                        Swal.fire({
                          title: 'Usuario registrado correctamente!',
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
                            this.ngOnInit()
                            this.recargar()
                          }
                        })
                      }
                    )
                  }
                )
              }
            )
          } else {
            Swal.fire("El username que eligio ya está en uso!", "warning");
          }
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
