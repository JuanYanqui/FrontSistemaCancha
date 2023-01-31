import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/core/models/cliente';
import { Empresa } from 'src/app/core/models/empresa';
import { Persona } from 'src/app/core/models/persona';
import { Roles } from 'src/app/core/models/roles';
import { Usuario } from 'src/app/core/models/usuario';
import { ClientesService } from 'src/app/modules/empresa-admin/services/clientes.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-register-cliente',
  templateUrl: './register-cliente.component.html',
  styleUrls: ['./register-cliente.component.css']
})
export class RegisterClienteComponent implements OnInit {

  clientes: Cliente = new Cliente();
  persona: Persona = new Persona();
  empresa: Empresa = new Empresa;
  usuario: Usuario = new Usuario;
  rol: Roles = new Roles;

  cedula: any;
  nombres: any;
  apellidos: any;
  usuarios: any;
  correo: any;
  telefono: any;
  celular: any;
  direccion: any;

  constructor(private toastr: ToastrService, private rolService: RolesService, private personaService: PersonaService, private clienteService: ClientesService, private usuarioService: UsuarioService) { }
  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/;
  blockCorreo: RegExp = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
  fechaActual: any;
  observaciones: any;

  flagpersona!: boolean;

  ngOnInit(): void {
    this.obtenerEmpresa();
    this.obtenerRol();
  }

  obtenerEmpresa() {
    let idUsuario = localStorage.getItem('idUsuario');
    this.usuarioService.getPorId(idUsuario).subscribe(
      data => {
        // this.empresa = data.empresa!;

        console.log(this.empresa);
      }
    )
  }

  obtenerRol() {
    this.rolService.getByName('CLIENTE').subscribe(
      data => {
        this.rol = data;
      }
    )
  }

  FotoPorDefecto: any = "usuarioPorDefecto.png"

  guardarDatos() {
    if (this.validarDatos() == 0 && this.persona.cedula?.length === 10) {
      this.fechaActual = new Date()
      // this.clientes.fechaRegistro = this.fechaActual;
      // this.clientes.estado = true;

      // this.usuario.empresa = this.empresa;
      this.usuario.estado = true;
      this.usuario.rol = this.rol;
      // this.usuario.foto = this.FotoPorDefecto;

      if (this.flagpersona) {
        //Cuando no se encuentra a la persona por la cedulase la registra
        this.personaService.save(this.persona).subscribe(data => {
          this.persona = data;
          console.log("Persona registrada");
          this.registraUsuarioCliente(this.persona);

        });
      } else {
        //Cuando encuentra a la persona solo obtiene sus datos;
        this.registraUsuarioCliente(this.persona);
      }
    } else {
      this.toastr.warning('Verifique los campos del cliente', 'Advertencia!')
    }
  }

  registraUsuarioCliente(persona: Persona) {
    this.usuario.persona = persona;

    this.usuarioService.postUsuario(this.usuario).subscribe(
      result => {
        this.usuario.idUsuario = result.idUsuario;

        // this.clientes.usuario = this.usuario;

        this.clienteService.save(this.clientes).subscribe(data => {
          this.borrarFormulario();
          this.toastr.success('Cliente registrado correctamente', 'Registro exitoso!');
        });
      }
    );
  }

  buscarPorCedula() {

    if (this.persona.cedula != null && this.persona.cedula != '') {
      this.personaService.getPorCedula(this.persona.cedula).subscribe(
        data => {
          console.log(data);
          if (data != null) {

            this.flagpersona = false;

            this.persona.apellido = data.apellido;
            this.persona.cedula = data.cedula;
            this.persona.celular = data.celular;
            this.persona.email = data.email;
            this.persona.direccion = data.direccion;
            this.persona.genero = data.genero;
            this.persona.idPersona = data.idPersona;
            this.persona.nombre = data.nombre;
            this.persona.telefono = data.telefono;
            this.persona.fecha_nacimiento = data.fecha_nacimiento;
          } else if (this.persona.cedula?.length == 10) {
            this.flagpersona = true;

            this.toastr.info('La cedula ingresada no esta registrada en el sistema', 'Cedula no encontrada')
          }
        }
      )
    } else {
      this.toastr.warning('Cedula incorrecta', 'Advertencia!')
    }

  }

  borrarFormulario() {
    this.flagpersona = false;
    this.persona = new Persona;
    this.usuario = new Usuario;
    this.clientes = new Cliente;
  }
  validarDatos() {
    let datos = 0
    if (this.persona.cedula == null || this.persona.cedula == "" || this.persona.cedula.length <= 9) {
      this.cedula = 1;
      datos = datos + 1;
    } else {
      this.cedula = 0;
    }
    if (this.persona.nombre == null || this.persona.cedula == "" || this.persona.nombre.length <= 2) {
      this.nombres = 1;
      datos = datos + 1;
    } else {
      this.nombres = 0;
    }
    if (this.usuario.username == null || this.usuario.password == "" || this.usuario.password.length <= 5) {
      this.usuarios = 1;
      datos = datos + 1;
    } else {
      this.usuarios = 0;
    }
    return datos;
  }
}
