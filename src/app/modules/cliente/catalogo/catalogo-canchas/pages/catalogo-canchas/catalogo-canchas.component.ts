import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
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
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { MouseEvent as MapMouseEvent } from '@agm/core';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { CanchasService } from 'src/app/shared/services/cancha.servicio';
import { Canchas } from 'src/app/core/models/canchas';

@Component({
  selector: 'app-catalogo-canchas',
  templateUrl: './catalogo-canchas.component.html',
  styleUrls: ['./catalogo-canchas.component.css']
})
export class CatalogoCanchasComponent {
  listaUsuarios: Usuario[] = [];
  listaestablecimiento: any []=[];
  listacanchaporesta:any []=[];
  canchas: Canchas = new Canchas;
  listacancha: any []=[];
  listaubicaciones: any []=[];
  idparareservar!: number;
  loaded = false;
    loading: boolean = true;
    showMe!: boolean;
    selectedId = 0;
    arrayExcel:any;
    arraySelected:any;
  
    displayEU: boolean = false;
  
    genero: any;
    pageActual:number=1;
    fecha: string = '';
    latu: number = 0;
  longu: number= 0;
  
    persona: Persona = new Persona;
    usuario: Usuario = new Usuario;
    establecimiento: Establecimiento = new Establecimiento;
    ubicacion: Ubicacion= new Ubicacion;
  
    blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
    valCorreo: RegExp = /^[^<>*!$%^=\s+?`\|{}[~"']+$/
  
    icnActivo: String = "pi pi-check";
    icnInactivo: String = "pi pi-times";
  hasBarControl = new FormControl(false);
  hasEstacionamientoControl = new FormControl(false);
  hasbanioControl = new FormControl(false);
  hasVestidirControl = new FormControl(false);
  isButtonEnabled2: boolean = false;
  
  idesta:any;
  idsalida:any;
    lat: number = 0;
    long: number= 0;
    zoom: number;
    entrada: any
    iconUrl?: String;
   mapTypeId: string;
    generos: string[] = [
      'Masculino', 'Femenino', 'Otro'
    ];

  
    constructor(private fotoService: FotoService, private canchaService: CanchasService, private toastr: ToastrService, private personaService: PersonaService, private ubicacionService: UbicacionService, private establecimientoService: EstablecimientoService, private router: Router) {
      this.lat=-1.831239;
      this.long =-78.183406;
      this.zoom = 25;
      this.mapTypeId = 'hybrid';
      this.iconUrl = 'https://media3.giphy.com/media/KFPrlCarpIKgj5suYj/giphy.gif?cid=790b76111fd939e5e5e898c968a52f0cc8c2c03f6ba27fe5&rid=giphy.gif&ct=s';
      this.obtenerEstablecimiento();
     }
  
    ngOnInit(): void {
    }
  
    obtenerEstablecimiento() {
      this.establecimientoService.getEstablecimiento().subscribe(
        data => {
          this.listaestablecimiento = data;
          console.log(data);
        }
      );
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

    mostrarCanchas = false;

toggleCanchas(idEstablecimiento: number) {
  this.mostrarCanchas = !this.mostrarCanchas;
  if (this.mostrarCanchas) {
    this.obtenerEstablecimiento();
    this.obtenerCanchaporEsta(idEstablecimiento);
  }
}

    // this.establecimientoService.getEstablecimiento().subscribe(
    //   data => {
    //     this.listaestablecimiento = data;
        
    //     console.log(data);
    //     this.loaded = true;
    //       this.loading = false;
    //       this.canchaService.getCanchas().subscribe(
    //         data=> {
    //           this.listacancha = data;
    //           console.log(data);
    //         }
    //       );
    //   }
    // );


    obtenerCancha(){

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
  
    actualizarEsta() {
      this.establecimiento.fotoestablecimiento = this.nombre_orignal;
      this.ubicacionService.updateUbicacion(this.ubicacion, this.ubicacion.idUbicacion).subscribe(
        data => {
          this.ubicacion.idUbicacion = data.idUbicacion;
          this.establecimiento.ubicacion = this.ubicacion;
          
          this.cargarImagen();
          this.establecimientoService.updateEstablecimiento(this.establecimiento, this.establecimiento.idEstablecimiento).subscribe(
            result => {
              console.log(result);
              this.limpiar();
              this.toastr.success('Establecimiento actualizado correctamente', 'Exitoso!');
  
            }
          )
        }
      )
    }
  
    getCoordinates(event: MapMouseEvent) {
      this.latu = event.coords.lat;
      console.log(this.latu)
      this.longu = event.coords.lng;
      console.log(this.longu)
      // this.getLocationData(this.latu, this.longu);
      // this.geocodeAddress(this.latu, this.longu);
      this.ubicacion.latitud = this.latu;
  console.log(this.ubicacion.latitud)
  this.ubicacion.longitud = this.longu;
  console.log(this.ubicacion.longitud)
    }
  
    checkHasBar() {
      if (this.hasBarControl.value) {
        console.log('Does not have bar');
        this.establecimiento.bar = false;
        console.log(this.establecimiento.bar);
      } else {
        console.log('Has bar');
        this.establecimiento.bar = true;
        console.log(this.establecimiento.bar);
      
      }
    }
    
    checkHasEsta() {
      if (this.hasEstacionamientoControl.value) {
        console.log('Does not have esta');
        this.establecimiento.estacionamiento = false;
        console.log(this.establecimiento.estacionamiento);
      } else {
        console.log('Has esta');
        this.establecimiento.estacionamiento = true;
        console.log(this.establecimiento.estacionamiento);
      
      }
    }
    checkHasBanio() {
      if (this.hasbanioControl.value) {
        console.log('Does not have banio');
        this.establecimiento.banios = false;
        console.log(this.establecimiento.banios);
      } else {
        console.log('Has banio');
        this.establecimiento.banios = true;
        console.log(this.establecimiento.banios);
      
      }
    }
    checkHasVesti() {
      if (this.hasVestidirControl.value) {
        console.log('Does not have vesti');
        this.establecimiento.vestidores = false;
        console.log(this.establecimiento.vestidores);
      } else {
        console.log('Has vesti');
        this.establecimiento.vestidores = true;
        console.log(this.establecimiento.vestidores);
      
      }
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
  
    // metodoubi(){
    //   //  this.longitudF = localStorage.getItem('latitudguard');
    //    const latitudcap = localStorage.getItem('latitudguard');
    //   console.log(latitudcap);
    //   // console.log(this.latitudF);
    //   const longitdcap = localStorage.getItem('longitudguard');
    //   console.log(latitudcap);
    // }
    limpiar() {
      this.displayEU = false;
      this.establecimiento = new Establecimiento;
      this.ubicacion = new Ubicacion;
  
      this.loading = true;
      this.listaUsuarios = [];
      this.obtenerEstablecimiento();
      this.obtenerUbicacion();
    }
  
  
  
    // actualizarUsuario() {
    //   this.personaService.updatePersona(this.persona, this.persona.idPersona).subscribe(
    //     data => {
    //       this.persona.idPersona = data.idPersona;
    //       this.usuario.persona = this.persona;
  
    //       this.usuarioService.updateUsuario(this.usuario, this.usuario.idUsuario).subscribe(
    //         result => {
    //           console.log(result);
    //           this.limpiar();
    //           this.toastr.success('Usuario actualizado correctamente', 'Exitoso!');
  
    //         }
    //       )
    //     }
    //   )
    // }
  
    // darBajaUsuario(usuario: Usuario) {
    //   let title = '';
  
    //   if (!usuario.estado) {
    //     usuario.estado = false;
    //     title = 'Deshabilitado!';
    //   } else {
    //     usuario.estado = true;
    //     title = 'Habilitado!';
    //   }
  
    //   this.usuarioService.updateUsuario(usuario, usuario.idUsuario).subscribe(
    //     data => {
    //       console.log(data);
    //       this.toastr.warning('Usuario ' + title, 'Advertencia!')
    //       this.limpiar();
    //     }
    //   )
    // }
  
    // limpiar() {
    //   this.displayEU = false;
    //   this.persona = new Persona;
    //   this.usuario = new Usuario;
  
    //   this.loading = true;
    //   this.listaUsuarios = [];
    //   this.obtenerUsuariosPrivilegios();
    // }
  
      
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
  
  }
