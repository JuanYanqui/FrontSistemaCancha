import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/core/models/persona';
import { Roles } from 'src/app/core/models/roles';
import { Usuario } from 'src/app/core/models/usuario';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { CargarScriptsService } from 'src/app/cargar-scripts.service'; 
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  rol: Roles = new Roles;

  persona: Persona = new Persona;
  usuario: Usuario = new Usuario;

  verfNombres: any;
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

  constructor(private cargarScripts: CargarScriptsService, private toastr: ToastrService, private personaService: PersonaService, private usuarioService: UsuarioService, private rolService: RolesService, private router: Router) {
    cargarScripts.Carga(["register-user.component"])

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
  goTo($event: any) :void{
 
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

  registrarUsuario() {

    if (this.persona.nombre === '' || this.persona.nombre === null) {
      this.verfNombres = 'ng-invalid ng-dirty';
      this.toastr.error("Campo nombres vacio!", "Error!");
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
                          icon: 'success',
                          title: 'Usuario registrado correctamente',
                          text: 'Bienvenido!',
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

          } else if (this.persona.cedula?.length == 10) {
            this.flapersona = true;

            this.toastr.info('La cedula ingresada no esta registrada en el sistema', 'Cedula no encontrada')
          }
        }
      )
    } else {
      this.toastr.warning('Cedula incorrecta', 'Advertencia!')
    }

  }

  registrarPersona(){
    if (this.persona.apellido != '' && this.persona.cedula != '' && this.persona.celular != '' && this.persona.email != '' &&
      this.persona.direccion != '' && this.persona.genero != '' && this.persona.nombre != '' && this.persona.telefono != '') {
      this.personaService.postPersona(this.persona).subscribe(
        data => {
          console.log(data);
          Swal.fire('Persona registrada correctamente!', 'success');
          Swal.fire({
        icon: 'success',
        title: 'En buena hora',
        text: 'Persona registrada correctamente!',
          })
        }
      );
      this.isButtonEnabled = true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Datos incompletos',
      })
    }
}

// limpiar(){
//   console.log("limpiar")
//   this.form.reset();
    
// }

}
