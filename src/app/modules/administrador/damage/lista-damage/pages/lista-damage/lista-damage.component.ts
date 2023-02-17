import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/core/models/persona';
import { Registro_Damage } from 'src/app/core/models/registro_damage';
import { Usuario } from 'src/app/core/models/usuario';
import { FotoService } from 'src/app/shared/services/foto.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { Registro_DamageService } from 'src/app/shared/services/registro_damage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-lista-damage',
  templateUrl: './lista-damage.component.html',
  styleUrls: ['./lista-damage.component.css']
})
export class ListaDamageComponent {
  lista: any []=[];
  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";
  displayEU: boolean = false;
  blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/
  persona: Persona = new Persona;
  pageActual:number=1;
  registro_damage:Registro_Damage=new Registro_Damage;

  constructor(private toastr: ToastrService, private fotoService: FotoService, private personaService: PersonaService, private damageService:Registro_DamageService, private router: Router) 
  {
    this.getDamageRegister();
  }

  getDamageRegister(){
    this.damageService.getRegistroDamage().subscribe(
      data=>{
        this.lista=data;
      }
    )
  }

  updateDamageRegister(){
    this.registro_damage.foto=this.nombre_orignal;
    this.damageService.putRegistroDamage(this.registro_damage,this.registro_damage.idDamage).subscribe(
      result=>{
        this.toastr.success('Usuario actualizado correctamente', 'Exitoso!');
      }
      
    )
    
  }

  editarLista(registro_damage:Registro_Damage){
    this.displayEU=true

    this.registro_damage.descripcion=registro_damage.descripcion;
    this.registro_damage.valor=registro_damage.valor;
    this.registro_damage.foto=registro_damage.foto;
    this.registro_damage.idDamage=registro_damage.idDamage;
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
