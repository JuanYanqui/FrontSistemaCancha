import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/core/models/persona';
import { Registro_Damage } from 'src/app/core/models/registro_damage';
import { Usuario } from 'src/app/core/models/usuario';
import { FotoService } from 'src/app/shared/services/foto.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { Registro_DamageService } from 'src/app/shared/services/registro_damage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { Pago_Damage } from 'src/app/core/models/pago_damage';
import { Pago_DamageService } from 'src/app/shared/services/pago_damage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-damage',
  templateUrl: './lista-damage.component.html',
  styleUrls: ['./lista-damage.component.css']
})
export class ListaDamageComponent {

  lista: any[] = [];

  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";

  displayEU: boolean = false;
  displayPG: boolean = false;

  persona: Persona = new Persona;
  pago_damage: Pago_Damage = new Pago_Damage;
  registro_damage: Registro_Damage = new Registro_Damage;

  currentDate: Date = new Date();
  id_personaIsLoggin: any;
  pageActual: number = 1;
  subcadena: string = '';

  constructor(private toastr: ToastrService, private fotoService: FotoService, private personaService: PersonaService, private damageService: Registro_DamageService, private router: Router, private location: Location, private pagoService: Pago_DamageService) {
    this.getPagoRegister();
    //this.getDamageRegister();
  }

  getPagoRegister() {
    this.id_personaIsLoggin = localStorage.getItem('localIdPersona');
    this.pagoService.getPago(this.id_personaIsLoggin).subscribe(
      data => {
        this.lista = data;
      }
    )
  }

  descripcionSubcadena(cadena: string) {
    this.subcadena = '';
    this.subcadena = cadena.substring(0, 10) + "...";
  }

  getDamageRegister() {
    this.damageService.getRegistroDamage().subscribe(
      data => {
        this.lista = data;
      }
    )
  }

  updateDamageRegister() {

    this.registro_damage.foto = this.nombre_orignal;
    this.cargarImagen();

    if (this.registro_damage.descripcion == '') { this.toastr.error("Campo descripcion erroneo!", "Error!"); }
    else if (this.registro_damage.valor == null) { this.toastr.error("Campo Valor erroneo!", "Error!"); }
    else if (this.registro_damage.valor < 0) { this.toastr.error("Campo valor erroneo debe ser mayor a cero!", "Error!"); }
    else if (this.registro_damage.foto.length === 0) { this.toastr.error("Campo foto erroneo!", "Error!"); }
    else {
      if (this.nombre_orignal.length != 0) { this.registro_damage.foto = this.nombre_orignal; }
      this.damageService.putRegistroDamage(this.registro_damage, this.registro_damage.idDamage).subscribe(
        result => {
          Swal.fire({
            title: 'Daño actualizado correctamente!',
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
              this.displayEU = false
              this.limpiar()
            }
          })
        }

      )
    }

  }

  limpiar() {
    this.nombre_orignal = '';
    this.pago_damage = new Pago_Damage;
    this.lista = [];
    this.getPagoRegister()
  }

  refreshPage() {
    this.location.go(this.location.path())
  }

  pagarDamage(pago_damage: Pago_Damage) {
    this.displayPG = true

    this.pago_damage.idPago = pago_damage.idPago;
    this.pago_damage.foto = pago_damage.foto;
    this.pago_damage.fecha_pago = this.currentDate;
    this.pago_damage.estado = "PAGADO"
  }

  updatePago() {
    this.pago_damage.foto = this.nombre_orignal;
    this.cargarImagen()

    if (this.pago_damage.foto.length === 0) { this.toastr.error("Campo foto vacio!", "Error!"); }
    else {
    this.pagoService.putPago(this.pago_damage, this.pago_damage.idPago).subscribe(
      result => {
        this.cargarImagen()
        this.toastr.success('Pago registrado correctamente', 'Exitoso!')
        this.displayPG = false
        this.goToR()
        this.limpiar()
      }
    )
    }
  }


  goToR(){
    this.router.navigate(['/lista-damage'])
  }

  editarLista(registro_damage: Registro_Damage) {
    this.displayEU = true

    this.registro_damage.descripcion = registro_damage.descripcion;
    this.registro_damage.valor = registro_damage.valor;
    this.registro_damage.foto = registro_damage.foto;
    this.registro_damage.idDamage = registro_damage.idDamage;
    this.nombre_orignal = registro_damage.foto;
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
