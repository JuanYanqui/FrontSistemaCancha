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
import { Establecimiento } from 'src/app/core/models/establecimiento';
@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent {
  rol: Rol = new Rol;

  persona: Persona = new Persona;
  usuario: Usuario = new Usuario;

  verfNombres: any;
  isinactivo: boolean = false;
  verfApellidos: any;
  verfCorreo: any;
  verfUsername: any;
  verfPassword: any;
  isButtonEnabled: boolean = false;
  isButtonEnabled2: boolean = false;
  expCorreo: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  valCorreo: boolean = true;
  flapersona: boolean = true;
  blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  listaRoles: any[] = [];
  listaEmpresas: Establecimiento[] = [];

  estVerificarCedula: boolean = false;
  estVerificarEmail: boolean = false;
  estFechaNacimiento: boolean = false;
  estvalUsu: boolean = false;

  estVerificarContraMay: boolean = false;
  estVerificarContraMin: boolean = false;
  estVerificarContraNum: boolean = false;
  estVerificarContraCar: boolean = false;
  estVerificarContraLon: boolean = false;

  ao1: string = '';
  ao2: string = '';

  constructor(private cargarScripts: CargarScriptsService, private fotoService: FotoService, private toastr: ToastrService, private personaService: PersonaService, private usuarioService: UsuarioService, private rolService: RolesService, private router: Router) {
    cargarScripts.Carga(["register-user.component"])
    this.obtenerRoles();

  }

  recargar($event: any): void {

    this.router.navigate(['/sup-admin/usuarioadmin/register-usuarioadmin'])
    console.log($event)
  }


  ngOnInit(): void {

    this.persona.nombre = '';
    this.persona.apellido = '';
    this.persona.email = '';
    this.usuario.username = '';
    this.usuario.password = '';

  }

  obtenerRoles() {
    this.rolService.getAll().subscribe(
      data => {
        this.listaRoles = data;
      }
    )
  }

  goTo($event: any): void {

    this.router.navigate(['/login-usr'])
    console.log($event)
  }

  validarCorreo() {
    this.valCorreo = this.expCorreo.test(this.persona.email!);
    if (this.valCorreo) {
      this.verfCorreo = '';
    } else {
      this.verfCorreo = 'ng-invalid ng-dirty';
    }
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

  goToR(){
    // this.router.navigate(['/register-usuarioadmin'])
    window.location.reload();
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

  validarFecha(){
    this.ao1 = String(new Date());
    this.ao1 = this.ao1[11] + this.ao1[12] + this.ao1[13] + this.ao1[14];
    this.ao2 = String(new Date(String(this.persona.fechaNacimmiento)));
    this.ao2 = this.ao2[11] + this.ao2[12] + this.ao2[13] + this.ao2[14];

    let f1: number = Number(this.ao1);
    let f2: number = Number(this.ao2);

    let res: number = f1 - f2;
    if (res >= 18){
      this.estFechaNacimiento = true;
    } else {
      this.estFechaNacimiento = false;
    }
  }

  buscarPorCedula() {

    if (this.persona.cedula != null && this.persona.cedula != '') {
      this.personaService.getPorCedula(this.persona.cedula).subscribe(
        data => {
          console.log(data);
          if (data != null) {
            this.toastr.success('Dato encontrado en a base');
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

            this.toastr.info('La cédula ingresada no esta registrada en el sistema', 'Cédula no encontrada')
          } else if (this.persona.cedula?.length == 0) {
            this.toastr.info('La cédula ingresada no cumple con el numero de extensión')
          } else if (this.persona.cedula?.length == 11) {
            this.toastr.info('La cédula ingresada no cumple con el numero de extensión')
          }
        }
      )
    } else {
      this.toastr.warning('Cédula incorrecta', 'Advertencia!')
      Swal.fire('Cédula incorrecta', 'Advertencia!')
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
    else if (typeof this.persona.direccion === 'undefined') { this.toastr.error("Campo direccion erróneo", "Error!"); }
    else if (this.estFechaNacimiento == false || String(this.persona.fechaNacimmiento).length === 0) { this.toastr.error("Campo fecha erróneo", "Error!"); }
    else if (typeof this.persona.genero === 'undefined') { this.toastr.error("Campo genero erróneo", "Error!"); }
    else if (this.persona.telefono?.length != 11 || typeof this.persona.telefono === 'undefined') { this.toastr.error("Campo teléfono erróneo", "Error!"); }
    else if (this.persona.celular?.length != 11 || this.persona.celular == '0_-________') { this.toastr.error("Campo celular erróneo", "Error!"); }
    else if (this.persona.foto?.length === 0) { this.toastr.error("Campo foto erróneo", "Error!"); }
    else{

      this.personaService.getPorCedula(this.persona.cedula).subscribe(
        data => {
          if (data != null) {

            Swal.fire({
              title: 'La cédula ingresada ya a sido ingresada',
              text: "¿Desea continuar con este registro?",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Continuar!'
            }).then((result) => {
              if (result.isConfirmed) {
                this.isButtonEnabled = true;
                Swal.fire(
                  'PROCESO',
                  'CON ÉXITO',
                  'success'
                )
                this.disablebtn()
              }
            })
          } else {
            this.personaService.postPersona(this.persona).subscribe(
              data => {
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
                    this.persona.foto = "";
                  }
                })
              }
            );
          }
        }

      )
    }
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
    else if (this.rol == null) { this.toastr.error("Seleccionar un rol", "Error!"); }
    else {
      this.usuarioService.verfUsername(this.usuario.username).subscribe(
        data => {
          if (!data) {
            this.personaService.postPersona(this.persona).subscribe(
              data => {
                console.log(data);
                this.persona.idPersona = data.idPersona;
                this.usuario.persona = this.persona;
                this.usuario.estado = true;
                this.usuario.rol = this.rol;
                this.usuarioService.postUsuario(this.usuario).subscribe(
                  result => {
                    console.log(result);
                    this.usuario = result;
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
                        this.goToR();
                        this.limpiarU();
                      }
                    })
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

  disablebtn() {
    const button = document.getElementById("btnregistrarpersona") as HTMLButtonElement;
    button.disabled = true;
  }

  filtersImplements(e: any) {
    let filters = e.target.value;
    if (filters === '' || filters === undefined || filters === null) {
      console.log('Rol no seleccionado');
    } else {
      this.usuario.rol = filters;
      console.log(this.usuario.rol);
    }
  }

  // limpiar(){
  //   console.log("limpiar")
  //   this.form.reset();

  // }

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

  limpiarP(){
    this.persona.nombre = "";
    this.persona.apellido = "";
    this.persona.email="";
    this.persona.cedula="";
    this.persona.celular="";
    this.persona.telefono="";
    this.persona.direccion="";
    this.persona.foto="";
    this.persona.genero="";
    this.persona.fechaNacimmiento = new Date;
      
  }
  limpiarU(){
    this.persona.nombre = "";
    this.persona.apellido = "";
    this.persona.cedula="";
    this.usuario.username="";
    this.usuario.password = ""; 
  }

  recarga(){
    window.location.reload();
  }



}
