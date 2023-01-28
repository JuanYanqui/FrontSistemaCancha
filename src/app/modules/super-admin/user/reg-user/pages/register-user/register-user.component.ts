import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/core/models/empresa';
import { Persona } from 'src/app/core/models/persona';
import { Roles } from 'src/app/core/models/roles';
import { Usuario } from 'src/app/core/models/usuario';
import { EmpresaService } from 'src/app/modules/super-admin/empresa/services/empresa.service';
import { FotoService } from 'src/app/shared/services/foto.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  persona: Persona = new Persona;
  usuario: Usuario = new Usuario;

  empresa: Empresa = new Empresa;
  rol: Roles = new Roles;

  fechaNacimiento: Date = new Date;

  listaRoles: Roles[] = [];
  listaEmpresas: Empresa[] = [];
  genero: any;

  generos: string[] = [
    'Masculino', 'Femenino', 'Otro'
  ];

  blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/

  flapersona: boolean = true;

  constructor(private fotoService: FotoService, private toastr: ToastrService, private personaService: PersonaService, private usuarioService: UsuarioService, private rolService: RolesService, private empresaService: EmpresaService, private router: Router) { }

  ngOnInit(): void {
    this.persona.genero = 'Genero';
    this.obtenerRoles();
    this.obtenerEmpresas();
  }

  obtenerRoles() {
    this.rolService.getAll().subscribe(
      data => {
        console.log(data);
        this.listaRoles = data.map(
          result => {
            let rol = new Roles;
            rol.descripcion = result.descripcion;
            rol.idRol = result.idRol;
            rol.nombre = result.nombre;

            return rol;
          }
        )
      }
    )
  }

  obtenerEmpresas() {
    this.empresaService.getEmpresas().subscribe(
      data => {
        console.log(data);
        this.listaEmpresas = data.map(
          result => {
            let empresa = new Empresa;
            empresa.nombre = result.nombre;
            empresa.idEmpresa = result.idEmpresa;
            empresa.ruc = result.acronimo;

            return empresa;
          }
        )
      }
    )
  }

  buscarPorCedula() {

    if (this.persona.cedula != null && this.persona.cedula != '') {
      this.personaService.getPorCedula(this.persona.cedula).subscribe(
        data => {
          console.log(data);
          if (data != null) {

            this.flapersona = false;

            this.persona.apellidos = data.apellidos;
            this.persona.cedula = data.cedula;
            this.persona.celular = data.celular;
            this.persona.correo = data.correo;
            this.persona.direccion = data.direccion;
            this.persona.genero = data.genero;
            this.persona.idPersona = data.idPersona;
            this.persona.nombres = data.nombres;
            this.persona.telefono = data.telefono;
            this.persona.fechaNacimiento = data.fechaNacimiento;
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

  resetRegistro() {
    this.persona.cedula = '';
    this.file = null;
    // this.productoForm.patchValue({ categoria: '', proveedor: '' });
  }

  registrarUsuario() {

    //this.persona.genero = this.genero.gen;

    this.usuario.estado = true;
    this.usuario.empresa = this.empresa;
    this.usuario.rol = this.rol;
    this.usuario.foto = this.nombre_orignal;

    if (this.flapersona) {

      this.usuarioService.verfUsername(this.usuario.username).subscribe(
        data => {
          if (!data) {
            this.personaService.postPersona(this.persona).subscribe(
              data => {
                this.persona.idPersona = data.idPersona;

                this.usuario.persona = this.persona;

                this.usuarioService.postUsuario(this.usuario).subscribe(
                  result => {
                    console.log(data);
                    this.cargarImagen();
                    this.resetRegistro();
                    this.toastr.success('Registro de usuario exitoso', 'Exitoso!');
                    console.log("es la 1");
                  }
                )

              }
            )
          } else {
            this.toastr.warning('Este username ya esta en uso', 'Advertencia');
            this.usuario.username = '';
          }
        }
      )
    } else {
      this.usuario.persona = this.persona;

      this.usuarioService.postUsuario(this.usuario).subscribe(
        data => {
          console.log(data);
          this.resetRegistro();
          this.toastr.success('Registro de usuario exitoso', 'Exitoso!');
          console.log("es la 2");
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
