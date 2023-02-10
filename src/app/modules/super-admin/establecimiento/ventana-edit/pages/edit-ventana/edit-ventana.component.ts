import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { Persona } from 'src/app/core/models/persona';
import { Ubicacion } from 'src/app/core/models/ubicacion';
import { Usuario } from 'src/app/core/models/usuario';
import { EstablecimientoService } from 'src/app/shared/services/establecimiento.service';
import { FotoService } from 'src/app/shared/services/foto.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { UbicacionService } from 'src/app/shared/services/ubicacion.sevice';

@Component({
  selector: 'app-edit-ventana',
  templateUrl: './edit-ventana.component.html',
  styleUrls: ['./edit-ventana.component.css']
})
export class EditVentanaComponent {
  listaUsuarios: Usuario[] = [];
listaestablecimiento: any []=[];
listaubicaciones: any []=[];
loaded = false;
  loading: boolean = true;
  showMe!: boolean;
  selectedId = 0;

  displayEU: boolean = false;

  genero: any;
  pageActual:number=1;
  fecha: string = '';

  persona: Persona = new Persona;
  usuario: Usuario = new Usuario;
  establecimiento: Establecimiento = new Establecimiento;
  ubicacion: Ubicacion= new Ubicacion;

  blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/

  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";
  lat: number = 0;
  long: number= 0;
  zoom: number;
 mapTypeId: string;
  generos: string[] = [
    'Masculino', 'Femenino', 'Otro'
  ];

  constructor(private fotoService: FotoService, private toastr: ToastrService, private personaService: PersonaService, private ubicacionService: UbicacionService, private establecimientoService: EstablecimientoService, private router: Router) {
    this.lat=40;
    this.long =-3;
    this.zoom = 6;
    this.mapTypeId = 'hybrid';
    this.obtenerEstablecimiento();
    this.obtenerUbicacion();
   }

  ngOnInit(): void {
    this.obtenerEstablecimiento();
    this.obtenerUbicacion() 
  }

  obtenerEstablecimiento() {
    this.establecimientoService.getEstablecimiento().subscribe(
      data => {
        this.listaestablecimiento = data;
        console.log(data);
        this.loaded = true;
          this.loading = false;
      }
    );
  }

  obtenerUbicacion() {
    this.ubicacionService.getUbicacion().subscribe(
      data => {
        this.listaubicaciones = data;
        console.log(data);
      }
    );
  }

  formatDate(date: string) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  actualizarUsuario() {
    this.establecimiento.fotoestablecimiento = this.nombre_orignal;
    this.establecimientoService.updateEstablecimiento(this.establecimiento, this.establecimiento.idEstablecimiento).subscribe(
      data => {
        this.establecimiento.idEstablecimiento = data.idEstablecimiento;
        this.establecimiento.ubicacion = data.ubicacion;
        
        this.cargarImagen();
        this.ubicacionService.updateUbicacion(this.ubicacion, this.ubicacion.idUbicacion).subscribe(
          result => {
            console.log(result);
            this.limpiar();
            this.toastr.success('Establecimiento actualizado correctamente', 'Exitoso!');

          }
        )
      }
    )
  }

  editarEstablecimiento(establecimiento: Establecimiento) {
    
    this.displayEU = true;
    
    this.establecimiento.nombre = establecimiento.nombre;
    this.establecimiento.horaApertura = establecimiento.horaApertura;
    this.establecimiento.horaCierre = establecimiento.horaCierre;
    this.ubicacion.calle_principal = establecimiento.ubicacion?.calle_principal;
    this.ubicacion.calle_secundaria = establecimiento.ubicacion?.calle_secundaria;
    // this.ubicacion.latitud = establecimiento.ubicacion?.latitud;
    // this.ubicacion.longitud = establecimiento.ubicacion?.longitud;
    this.ubicacion.numero = establecimiento.ubicacion?.numero;
    this.ubicacion.referencia = establecimiento.ubicacion?.referencia;

     this.persona.nombre = establecimiento.persona?.nombre;
    this.persona.idPersona = establecimiento.persona?.idPersona;
  }

  limpiar() {
    this.displayEU = false;
    this.establecimiento = new Establecimiento;
    this.ubicacion = new Ubicacion;

    this.loading = true;
    this.listaUsuarios = [];
    this.obtenerEstablecimiento();
    this.obtenerUbicacion();
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
