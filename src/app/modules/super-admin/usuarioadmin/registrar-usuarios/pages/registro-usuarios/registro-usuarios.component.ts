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

  isinactivo: boolean = false;
  isButtonEnabled: boolean = false;
  isButtonEnabled2: boolean = false;
  flapersona: boolean = true;

  rol: Rol = new Rol;
  persona: Persona = new Persona;
  usuario: Usuario = new Usuario;

  listaRoles: any[] = [];
  listaEmpresas: Establecimiento[] = [];

  estVerificarCedula: boolean = false;
  estVerificarEmail: boolean = false;
  estFechaNacimiento: boolean = false;
  estvalUsu: boolean = false;

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
    localStorage.removeItem('idUsuario');
    sessionStorage.removeItem('productosPedido');

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

  filtersImplements(e: any) {
    let filters = e.target.value;
    if (filters === '' || filters === undefined || filters === null) {
      console.log('Rol no seleccionado');
    } else {
      this.usuario.rol = filters;
      console.log(this.usuario.rol);
    }
  }

  onKeyPressLetras(event: KeyboardEvent) {
    const input = event.key;
    const pattern = /^[a-zA-Z\s]*$/; 

<<<<<<< Updated upstream
    if (this.persona.nombre === '' || this.persona.nombre === null) {
      this.verfNombres = 'ng-invalid ng-dirty';
      Swal.fire("Campo nombres vacio!", "Error!");
    }

    if (this.persona.apellido === '' || this.persona.apellido === null) {
      this.verfApellidos = 'ng-invalid ng-dirty';
      this.toastr.error("Campo apellidos vacio!", "Error!");
    }


    if (this.usuario.username === '' || this.usuario.username === null) {
      this.verfUsername = 'ng-invalid ng-dirty';
      this.toastr.error("Campo username vacio!", "Error!");
    }

    if (this.usuario.password === '' || this.usuario.password === null) {
      this.verfPassword = 'ng-invalid ng-dirty';
      this.toastr.error("Campo password vacio!", "Error!");
    }

    if (this.persona.nombre === '' || this.persona.apellido === '' || this.persona.email === '' || this.usuario.username === '' || this.usuario.password === ''
      || this.persona.nombre === null || this.persona.apellido === null || this.persona.email === null || this.usuario.username === null || this.usuario.password === null || !this.valCorreo) {

      this.toastr.warning("Verifique que esten correctos los campos")
    } else {
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
                    this.isButtonEnabled2 = true;
                    localStorage.setItem('idUsuario', String(this.usuario.idUsuario));
                    Swal.fire({
                      icon: 'success',
                      title: 'Usuario registrado correctamente',
                      text: 'Bienvenido!',
                    })
                   this.limpiarU()
                  }
                )

              }
            )
          } else {
            Swal.fire("El username que eligio ya está en uso!", "warning");
          }
=======
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
>>>>>>> Stashed changes
        }
      }
    )
  }
<<<<<<< Updated upstream
=======

  validarCorreoElectronico(correo: string) {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.estVerificarEmail = emailPattern.test(correo);
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

>>>>>>> Stashed changes
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
    console.log(this.persona.telefono);

    if(this.estVerificarCedula == false || this.persona.cedula?.length != 10){ this.toastr.error("Campo cedula erroneo", "Error!"); }
    else if(this.persona.nombre?.length === 0){ this.toastr.error("Campo nombre erroneo", "Error!"); }
    else if(this.persona.apellido?.length === 0){ this.toastr.error("Campo apellido erroneo", "Error!"); }
    else if(this.estVerificarEmail == false || this.persona.email?.length === 0){ this.toastr.error("Campo email erroneo", "Error!"); }
    else if(this.persona.direccion?.length === 0){ this.toastr.error("Campo direccion erroneo", "Error!"); }
    else if(this.estFechaNacimiento == false || String(this.persona.fechaNacimmiento).length === 0){ this.toastr.error("Campo fecha erroneo", "Error!"); }
    else if(this.persona.genero?.length === 0){ this.toastr.error("Campo genero erroneo", "Error!"); }
    else if(this.persona.telefono?.length != 11){ this.toastr.error("Campo telefono erroneo", "Error!"); }
    else if(this.persona.celular?.length != 11){ this.toastr.error("Campo celular erroneo", "Error!"); }
    else if(this.persona.foto?.length === 0){ this.toastr.error("Campo foto erroneo", "Error!"); }
    else {

      this.personaService.getPorCedula(this.persona.cedula).subscribe(
        data => {
          if (data != null) {

            Swal.fire({
              title: 'La cedula ingresada ya a sido ingresada',
              text: "Desea continuar con este registro",
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
                  'CON EXITO',
                  'success'
                )
              }
            })
          } else {
            this.personaService.postPersona(this.persona).subscribe(
              data => {
                Swal.fire('Persona registrada correctamente!', 'success');
                Swal.fire({
                  icon: 'success',
                  title: 'En buena hora',
                  text: 'Persona registrada correctamente!',
                })
                this.isButtonEnabled = true;
                this.limpiarP();
                this.persona.foto = "";
              }
            );
          }
        }

      )
    }
  }

  registrarUsuario() {

    if(this.usuario.username.length === 0 || this.usuario.username.length < 4){ this.toastr.error("Campo username erroneo", "Error!"); }
    else if(this.usuario.password.length === 0 || this.usuario.password.length < 5){ this.toastr.error("Campo contrase;a erroneo", "Error!"); }
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
                      icon: 'success',
                      title: 'Usuario registrado correctamente',
                      text: 'Bienvenido!',
                    })
                    this.limpiarU()
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
