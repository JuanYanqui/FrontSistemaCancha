import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/core/models/persona';
import { Usuario } from 'src/app/core/models/usuario';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-edit-usuarios',
  templateUrl: './edit-usuarios.component.html',
  styleUrls: ['./edit-usuarios.component.css']
})
export class EditUsuariosComponent {
  listaUsuarios: any []=[];
  loading: boolean = true;
  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";
  displayEU: boolean = false;
  blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/
  persona: Persona = new Persona;
  usuario: Usuario = new Usuario;
  pageActual:number=1;
  

  constructor(private toastr: ToastrService, private personaService: PersonaService, private usuarioService: UsuarioService, private router: Router) {
    this.obtenerUsuariosPrivilegios();
   }

  darBajaUsuario(usuario: Usuario) {
    let title = '';

    if (!usuario.estado) {
      usuario.estado = false;
      title = 'Deshabilitado!';
    } else {
      usuario.estado = true;
      title = 'Habilitado!';
    }
  }
  actualizarUsuario() {
    this.personaService.updatePersona(this.persona, this.persona.idPersona).subscribe(
      data => {
        this.persona.idPersona = data.idPersona;
        this.usuario.persona = this.persona;

        this.usuarioService.updateUsuario(this.usuario, this.usuario.idUsuario).subscribe(
          result => {
            console.log(result);
            this.limpiar();
            this.toastr.success('Usuario actualizado correctamente', 'Exitoso!');

          }
        )
      }
    )
  }

  limpiar() {
    this.displayEU = false;
    this.persona = new Persona;
    this.usuario = new Usuario;

    this.loading = true;
    this.listaUsuarios = [];
    this.obtenerUsuariosPrivilegios();
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


    this.usuario.rol = usuario.rol;
    this.usuario.estado = usuario.estado;
    this.usuario.idUsuario = usuario.idUsuario;
    this.usuario.password = usuario.password;
    this.usuario.username = usuario.username;

  }


  solicitar(){

  }

}
