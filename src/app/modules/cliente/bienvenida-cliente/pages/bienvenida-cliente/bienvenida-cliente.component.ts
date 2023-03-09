import { AgmMap, MapsAPILoader } from '@agm/core';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { Canchas } from 'src/app/core/models/canchas';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { Ubicacion } from 'src/app/core/models/ubicacion';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { EstablecimientoService } from 'src/app/shared/services/establecimiento.service';
import { FotoService } from 'src/app/shared/services/foto.service';


@Component({
  selector: 'app-bienvenida-cliente',
  templateUrl: './bienvenida-cliente.component.html',
  styleUrls: ['./bienvenida-cliente.component.css']
})
export class BienvenidaClienteComponent {
  lat: number = 0;
  long: number= 0;
  lati: number = 0;
  longi: number= 0;
  zoom: number;
  iconUrl?: String;
 mapTypeId: string;
 firstMapShown: boolean = false;
 address!: string;
 geocoder!: google.maps.Geocoder;
 direccion = '';
 autocomplete!: google.maps.places.Autocomplete;
 listaestablecimientomuestra: any []=[];
 listacanchaporesta:any []=[];
 canchas: Canchas = new Canchas;
 listacancha: any []=[];
 listaubicaciones: any []=[];
 idesta:any;
idsalida:any;
idestaesco:any;
idsalidaesco:any;
establecimiento: Establecimiento = new Establecimiento;
ubicacion: Ubicacion= new Ubicacion;
displayEU: boolean = false;
displayEU2: boolean = false;
Vistaescogido: boolean = false;
isButtonEnabled2: boolean = false;
showMe!: boolean;
showMe2!: boolean;
loading: boolean = true;
blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/


constructor(private fotoService: FotoService, private canchaService: CanchasService, private cargarScripts: CargarScriptsService,private establecimientoService: EstablecimientoService, private mapsAPILoader: MapsAPILoader){
  this.lat=-2.8923163;
  this.long =-79.009028;
  this.zoom = 13;
  this.mapTypeId = 'hybrid';
  cargarScripts.Carga(["botondialogcanchas"])
  this. obtenerEstablecimiento();
  this.searchControl = new FormControl();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
    });
  }

}
enviarId(idCancha: number){
  localStorage.setItem("canchaActual",String(idCancha))
}

listaestablecimiento:any;
obtenerEstablecimiento() {
 this.establecimientoService.getEstablecimiento().subscribe(
   data => {
     this.listaestablecimiento = data;
     console.log(data);
     
   }
   
 );
 this.firstMapShown = true;;
}

abrircatalogo(){
  this.displayEU2 = true;
  this.obtenerEstablecimiento();
}

searchControl!: FormControl;

buscarDireccion(): void {
  // Obtener la ubicación de la dirección ingresada por el usuario
  this.mapsAPILoader.load().then(() => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': this.direccion }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const ubicacion = results[0].geometry.location;
        this.lat = ubicacion.lat();
        this.long = ubicacion.lng();
        // Hacer zoom en la ubicación
        this.zoom = 14;
      } else {
        console.error('Error al buscar la dirección: ' + status);
      }
    });
  });
}

dataEst: any;
    capParaEdicion(idCancha: any) {
      this.dataEst = idCancha;
      localStorage.setItem("idCancha", String(this.dataEst));
      console.log("idCancha " + idCancha)
      }


    idEstablecimientoSeleccionado!: number;
    obtenerCanchaporEsta(idEstablecimiento: number){
      console.log(idEstablecimiento);
      this.idEstablecimientoSeleccionado = idEstablecimiento;
      this.establecimientoService.getPorId(idEstablecimiento).subscribe(
        data => {
          this.idsalida = data.idEstablecimiento;
          console.log("dato encontrado"+this.idsalida)

          this.canchaService.getByEstablecimiento(this.idsalida).subscribe(
            data => {
              this.listacanchaporesta = data;
              console.log(this.listacanchaporesta);

              
            }
          )
        }
        
      )
    }

    establecimientoescogido:any;
    idEsta!:number;
    obtenerEsta(idEsta: number){
      console.log(idEsta);
      this.idsalidaesco = idEsta;

          this.establecimientoService.getPorId(this.idsalidaesco).subscribe(
            data => {
              this.establecimientoescogido = data;
              console.log(this.establecimientoescogido);
               this.Vistaescogido = true;
            }
          )
        
      
    }

    abrirdialog3(){

      this.Vistaescogido = true;
      this.obtenerEsta(this.idEsta);
    }

    mostrarCanchas = false;

    toggleCanchas(idEstablecimiento: number) {
      this.mostrarCanchas = !this.mostrarCanchas;
      if (this.mostrarCanchas) {
        this.obtenerEstablecimiento();
        this.obtenerCanchaporEsta(idEstablecimiento);
      }
    }

    dataestable:any
    capidEstablecimiento(idEstablecimiento:any){
    this.dataestable = idEstablecimiento;
    localStorage.setItem("idEstablecimiento", String(this.dataestable));
    }

    valorlati: any;
    valorlongi: any;
    editarEstablecimiento(establecimiento: Establecimiento) {
      
      this.displayEU = true;
  
     this.establecimiento.idEstablecimiento = establecimiento.idEstablecimiento;
      this.establecimiento.nombre = establecimiento.nombre;
      this.establecimiento.horaApertura = establecimiento.horaApertura;
      this.establecimiento.horaCierre = establecimiento.horaCierre;
      this.ubicacion.calle_principal = establecimiento.ubicacion?.calle_principal;
      this.ubicacion.calle_secundaria = establecimiento.ubicacion?.calle_secundaria;
      
      this.ubicacion.latitud = establecimiento.ubicacion?.latitud;
      this.valorlati = establecimiento.ubicacion?.latitud;
      console.log("Valor de latitud"+this.valorlati);
      this.ubicacion.longitud = establecimiento.ubicacion?.longitud;
      this.valorlongi = establecimiento.ubicacion?.longitud;
      console.log("Vlor de longitd"+this.valorlongi);
      this.ubicacion.numero = establecimiento.ubicacion?.numero;
  
      this.ubicacion.referencia = establecimiento.ubicacion?.referencia;
      this.establecimiento.banios = establecimiento.banios;
      this.establecimiento.bar = establecimiento.bar;
      this.establecimiento.estacionamiento = establecimiento.estacionamiento;
      this.establecimiento.vestidores = establecimiento.vestidores;
      this.ubicacion.idUbicacion = establecimiento.ubicacion?.idUbicacion;
  
      this.establecimiento.fotoestablecimiento = establecimiento.fotoestablecimiento;
    //  this.metodoubi();
    }
    
    abrirDilog(id: number){
      this.canchaService.getPorId(id).subscribe( data => {
        this.displayEU = true;
        this.canchas.nombre = data.nombre;
        this.canchas.descripcion = data.descripcion;
        this.canchas.tarifa = data.tarifa;
        this.canchas.altura = data.altura;
        this.canchas.ancho = data.ancho;
        this.canchas.vacante = true;
        this.canchas.foto = data.foto;
      });
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

      limpiar() {
        this.displayEU = false;
        this.establecimiento = new Establecimiento;
        this.ubicacion = new Ubicacion;
    
        this.obtenerEstablecimiento();
      }
      

}
