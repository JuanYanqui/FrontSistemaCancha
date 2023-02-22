import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/core/models/persona';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import Swal from 'sweetalert2';
import { FotoService } from 'src/app/shared/services/foto.service';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { Registro_Damage } from 'src/app/core/models/registro_damage';
import { Registro_DamageService } from 'src/app/shared/services/registro_damage.service';
import { EstablecimientoService } from 'src/app/shared/services/establecimiento.service';
import { Pago_DamageService } from 'src/app/shared/services/pago_damage.service';
import { Pago_Damage } from 'src/app/core/models/pago_damage';

@Component({
  selector: 'app-registro-damage',
  templateUrl: './registro-damage.component.html',
  styleUrls: ['./registro-damage.component.css']
})
export class RegistroDamageComponent {
  registro_damage: Registro_Damage=new Registro_Damage;
  persona:Persona=new Persona;
  establecimiento:Establecimiento=new Establecimiento;
  pago_damage:Pago_Damage=new Pago_Damage;


  
  isButtonEnabled: boolean = false;
  flapersona: boolean = true;
  blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  verfCedula:any;
  verfDescripcion:any;
  verfValor:any;
  id_personaIsLoggin:any;
  displayEU: boolean = false;
  
  constructor(private cargarScripts: CargarScriptsService, private toast: ToastrService, private fotoService: FotoService, private toastr: ToastrService, private personaService: PersonaService, private router: Router,private registroDamageService:Registro_DamageService, private establecimientoService:EstablecimientoService, private pagoService:Pago_DamageService) {
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
    this.pago_damage.foto='';
    this.pago_damage.estado='NO PAGADO';
    
    
    this.id_personaIsLoggin = localStorage.getItem('localIdPersona');
    this.obtenerEst();
  }

  listaEstablecimineto: Establecimiento[] = [];


  

  obtenerEst() {
    this.establecimientoService.getListarEst(this.id_personaIsLoggin).subscribe(
      data => {
        this.listaEstablecimineto = data.map(
          result => {
            let e = new Establecimiento;
            e.idEstablecimiento=result.idEstablecimiento;
            e.fotoestablecimiento=result.fotoestablecimiento;
            e.nombre=result.nombre;
            return e;
          }
        );
      }
    )
  }

dataEst: any;

  capParaEdicion(idEstablecimiento: any) {
    this.displayEU=true
    this.dataEst = idEstablecimiento;
    console.log("idEstablecimiento " + idEstablecimiento)
  }

registarDamage(){
  this.establecimientoService.getPorId(this.dataEst).subscribe(
    data=>{
      this.establecimiento=data;
      this.registro_damage.cliente=this.persona;
      this.registro_damage.establecimiento=this.establecimiento;
      this.registro_damage.foto = this.nombre_orignal;
      this.registroDamageService.postRegistroDamage(this.registro_damage).subscribe(
        result=>{
          this.registro_damage.idDamage=result.idDamage;
          console.log(this.registro_damage.idDamage)
          this.pago_damage.registroDamage=this.registro_damage;
          this.pagoService.postPago(this.pago_damage).subscribe(
            x=>{
              console.log('funciono')
              Swal.fire(
                'PROCESO',
                'CON EXITO',
                'success'
              );
              this.cargarImagen();
              window.location.reload();
            }
          )
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

