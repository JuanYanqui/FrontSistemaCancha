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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-establecimiento',
  templateUrl: './edit-establecimiento.component.html',
  styleUrls: ['./edit-establecimiento.component.css']
})
export class EditEstablecimientoComponent {

  listaUsuarios: Usuario[] = [];
  listaestablecimiento: any[] = [];
  listaubicaciones: any[] = [];

  loaded = false;
  loading: boolean = true;
  displayEU: boolean = false;
  showMe!: boolean;
  selectedId = 0;
  pageActual: number = 1;

  arrayExcel: any;
  arraySelected: any;

  genero: any;
  fecha: string = '';


  persona: Persona = new Persona;
  usuario: Usuario = new Usuario;
  establecimiento: Establecimiento = new Establecimiento;
  ubicacion: Ubicacion = new Ubicacion;

  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";

  hasBarControl = new FormControl(false);
  hasEstacionamientoControl = new FormControl(false);
  hasbanioControl = new FormControl(false);
  hasVestidirControl = new FormControl(false);
  isButtonEnabled2: boolean = false;

  latu: number = 0;
  longu: number = 0;
  lat: number = 0;
  long: number = 0;
  zoom: number;

  iconUrl?: String;
  mapTypeId: string;

  generos: string[] = [
    'Masculino', 'Femenino', 'Otro'
  ];

  ao1: String = '';
  ao2: String = '';
  estHora: Boolean = false;

  valorlati: any;
  valorlongi: any;

  constructor(private fotoService: FotoService, private toastr: ToastrService, private personaService: PersonaService, private ubicacionService: UbicacionService, private establecimientoService: EstablecimientoService, private router: Router) {
    this.lat = -1.831239;
    this.long = -78.183406;
    this.zoom = 25;
    this.mapTypeId = 'hybrid';
    this.obtenerEstablecimiento();
    this.obtenerUbicacion();
  }

  ngOnInit(): void {
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

  validarFecha() {
    this.ao1 = String(this.establecimiento.horaApertura);
    this.ao1 = this.ao1[0] + this.ao1[1]
    this.ao2 = String(this.establecimiento.horaCierre);
    this.ao2 = this.ao2[0] + this.ao2[1]

    if (Number(this.ao1) != Number(this.ao2)) {
      this.estHora = true;
    } else {
      this.estHora = false;
    }
  }

  actualizarEsta() {

    this.validarFecha();
    this.cargarImagen();
    
    if (this.establecimiento.nombre == '') { this.toastr.error("Campo nombre de establecimiento erroneo", "Error!"); }
    else if (String(this.establecimiento.horaApertura) === '') { this.toastr.error("campos hora de apertura erroneo", "Error!"); }
    else if (String(this.establecimiento.horaCierre) === '') { this.toastr.error("campos hora de cierre erroneo", "Error!"); }
    else if (this.estHora == false) { this.toastr.error("campos hora no pueden ser iguales", "Error!"); }
    else if (String(this.ubicacion.calle_principal) === '') { this.toastr.error("Campo calle principal erroneo", "Error!"); }
    else if (String(this.ubicacion.calle_secundaria) === '') { this.toastr.error("Campo calle secundaria erroneo", "Error!"); }
    else if (String(this.ubicacion.referencia) === '') { this.toastr.error("Campo referencia erroneo", "Error!"); }
    else if (this.ubicacion.numero == null) { this.toastr.error("Campo numero de propiedad erroneo", "Error!"); }
    else {
      if (this.nombre_orignal.length != 0) { this.establecimiento.fotoestablecimiento = this.nombre_orignal; }
      
      console.log(this.establecimiento.fotoestablecimiento);
      this.ubicacionService.updateUbicacion(this.ubicacion, this.ubicacion.idUbicacion).subscribe(
        data => {
          this.ubicacion.idUbicacion = data.idUbicacion;
          this.establecimiento.ubicacion = this.ubicacion;


          this.cargarImagen();
          this.establecimientoService.updateEstablecimiento(this.establecimiento, this.establecimiento.idEstablecimiento).subscribe(
            result => {
              Swal.fire({
                title: 'Establecimiento actualizado correctamente!',
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
                  this.limpiar();
                }
              })
            }
          )
        }
      )
    }
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
    console.log("Valor de latitud" + this.valorlati);
    this.ubicacion.longitud = establecimiento.ubicacion?.longitud;
    this.valorlongi = establecimiento.ubicacion?.longitud;
    console.log("Vlor de longitd" + this.valorlongi);
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

  extractData(datosTabla: any) {
    console.log(datosTabla)
    return datosTabla.map((row: any) => [row.id || " ", row.ruc || " ", row.nombre || " ", row.calle_principal || " ", row.calle_secundaria || " ", row.representante || " ", row.apellido || " "]);
  }

  async generaraPDF() {
    if (this.arraySelected <= 0) {
      alert("Seleccione todos los productos para poder generara el pdf")
    } else {
      console.log(this.arraySelected)
      const pdf = new PdfMakeWrapper();
      pdf.pageOrientation('landscape')
      pdf.pageSize('A3')
      pdf.add(pdf.ln(2))
      pdf.add(new Txt("Reporte Establecimiento").bold().italics().alignment('center').end);
      pdf.add(pdf.ln(2))
      pdf.add(new Table([
        ['ID', 'RUC', 'Nombre', 'Calle Principal', 'Calle Secundaria', 'Representante', 'Apellido'],
      ]).widths(['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*']).layout(
        {
          fillColor: (rowIndex?: number, node?: any, columnIndex?: number) => {
            return rowIndex === 0 ? '#CCCCCC' : '';
          }
        }
      ).end)
      pdf.add(new Table([
        ...this.extractData(this.arraySelected)
      ]).widths('*').end)

      pdf.create().open();
    }
  }

  exportSelectedX() {
    if (this.arraySelected.length < 1) {
      alert('Por favor seleccione al menos un producto')
    } else {
      for (let i = 0; i < this.arraySelected.length; i++) {
        let nuevoUserE = this.arraySelected[i] || +" ";
        if (nuevoUserE == null || nuevoUserE == undefined)
          nuevoUserE = ""
        const usuarioImprimirSelected = {
          id: nuevoUserE.idEstablecimiento,
          ruc: nuevoUserE.ruc,
          nombre: nuevoUserE.nombre,
          calle_principal: nuevoUserE.ubicacion.calle_principal,
          calle_secundaria: nuevoUserE.calle_secundaria,
          representante: nuevoUserE.representante,
          apellido: nuevoUserE.apellido
        }
        this.arrayExcel.push(usuarioImprimirSelected || "");
        console.log(this.arrayExcel)
      }
      /*
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.arrayExcel);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Usuarios");
      });
    }
    */

    }
  }

}

