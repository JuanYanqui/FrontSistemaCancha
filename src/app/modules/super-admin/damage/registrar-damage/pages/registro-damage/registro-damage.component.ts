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
import { Registro_Damage } from 'src/app/core/models/registro_damage';

@Component({
  selector: 'app-registro-damage',
  templateUrl: './registro-damage.component.html',
  styleUrls: ['./registro-damage.component.css']
})
export class RegistroDamageComponent {
  registro_damage: Registro_Damage=new Registro_Damage;
  persona:Persona=new Persona;
  establecimiento:Establecimiento=new Establecimiento;
  
  isButtonEnabled: boolean = false;
  flapersona: boolean = true;
  
  constructor(private cargarScripts: CargarScriptsService, private toast: ToastrService, private fotoService: FotoService, private toastr: ToastrService, private personaService: PersonaService, private router: Router) {
    cargarScripts.Carga(["register-user.component"])

  }

  ngOnInit():void{
    this.registro_damage.descripcion='';
    this.registro_damage.idDamage=0;
    this.registro_damage.valor=0;

    this.persona.idPersona=0;
    this.persona.cedula='';
    this.persona.nombre='';
    this.persona.apellido='';
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

}

