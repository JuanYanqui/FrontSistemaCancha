import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { subscribeOn } from 'rxjs';
import { Persona } from 'src/app/core/models/persona';
import { Reclamos } from 'src/app/core/models/reclamos';
import { CargarscriptsService } from '../../services/cargarscripts.service';
import { EstablecimientoService } from '../../services/establecimiento.service';
import { ReclamoService } from '../../services/reclamo.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar-empresa-admin',
  templateUrl: './sidebar-empresa-admin.component.html',
  styleUrls: ['./sidebar-empresa-admin.component.css']
})
export class SidebarEmpresaAdminComponent implements OnInit, OnDestroy {

  items: MenuItem[] | any;
  idUsuario: any;
  idEstablecimiento: any
  nombreUsuario: any;
  nombreRol: any;
  nombreFoto: any;
  nombreLogo: any;
  nombreestablecimiento : any;

  isSuperAdmin: boolean = false;
  isAdminCancha: boolean = false;
  isClient: boolean = false;
  isPublic: boolean = false;

  isGerente: boolean = false;
  isBodega: boolean = false;
  isVenta: boolean = false;
  displayMaximizable: any;
  isLogin: boolean = false;


  constructor(
    private _CargarScripts: CargarscriptsService,
    private usuarioService: UsuarioService,
    private router: Router, private establecimientoService: EstablecimientoService,
    private reclamoService: ReclamoService


  ) {
    {
      _CargarScripts.carga(["script"])
    }

    this.rutaActual = this.router.url;
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.nombreFoto = localStorage.getItem('nameImagen') || '/assets/default.png';
    this.nombreLogo = localStorage.getItem('nameLogo') || 'defectoLogoEmpresas.png';
  }
  ngOnDestroy() {
    console.log("as");
  }

  obtenerUsuario() {
    this.idUsuario = localStorage.getItem('idUsuario');
    if (this.idUsuario != '' && this.idUsuario != undefined) {
      this.usuarioService.getPorId(this.idUsuario).subscribe((data) => {
        console.log(data);
        if (data != null) {

          // this.idEstablecimiento = localStorage.getItem('idEstablecimiento');
          // if (this.idEstablecimiento != '' && this.idEstablecimiento != undefined) {
          //   this.establecimientoService.getPorId(this.idEstablecimiento).subscribe((data) => {
          //     console.log(data);
          //     if (data != null) {
          //       this.nombreestablecimiento = data.nombre;
          //       console.log(this.nombreestablecimiento);

          //     } else {
          //       console.log("datos no encontrados")
          //     }

          //   });
          // }

          this.isLogin = true;

          this.nombreUsuario = data.persona?.nombre + ' ' + data.persona?.apellido;
          this.nombreRol = data.rol?.nombre
          console.log("Found the user => " + this.nombreFoto);

          switch (data.rol?.nombre) {
            case 'INVITADO':
              this.isSuperAdmin = false;
              this.isAdminCancha = false;
              this.isClient = false;
              this.isPublic = true;
              break;
            case 'CLIENTE':
              this.isSuperAdmin = false;
              this.isAdminCancha = false;
              this.isClient = true;
              this.isPublic = true;
              break;
            case 'ADMINISTRADOR':
              this.isSuperAdmin = false;
              this.isAdminCancha = true;
              this.isClient = false;
              this.isPublic = false;
              break;
            case 'SUPER ADMINISTRADOR':
              this.isSuperAdmin = true;
              this.isAdminCancha = false;
              this.isClient = false;
              this.isPublic = false;
              break;
            default:
              alert('Rol desconocido');
              break;
          };



        } else {
          this.isLogin = false;
          this.nombreUsuario = 'NULL';
        }
      });
    }
  }


  iniciarSesion() {
    //   location.replace('/log-in');

    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['log-in']);
      });
  }

  registrarse() {
    //   location.replace('/add-public-prolife');

    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['add-public-prolife']);
      });
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  cerrarSesion() {
    sessionStorage.removeItem('productosPedido');
    localStorage.removeItem('idUsuario');
    location.replace('/login-usr');
  }

  @ViewChild('btnnotif', { static: true }) btnnotif?: ElementRef;
  idAdmin: number = 0;
  notificaciones: any[] | undefined;
  notificacionesPendientes: number | undefined;
  notificacionesMostradas = false;
  mostrarDialogo = false;
  modalRef: any;
  modalService: any;
reclamo: Reclamos = new Reclamos;
listaReclamos: Reclamos[] = [];
  displayEU: boolean = false;

  client: Persona[] = [];
  administrator: Persona[] = [];
  totalRecords?: number;

  loading?: boolean

  selectAll: boolean = false;

  i: number = 0;

  verReclamo(reclamo: Reclamos) {

    this.displayEU = true;

    this.reclamo.idReclamo = reclamo.idReclamo;
    this.reclamo.titulo = reclamo.titulo;
    this.reclamo.descripcion = reclamo.descripcion;
    this.reclamo.fecha_reclamo = reclamo.fecha_reclamo;
    this.reclamo.estado = true;
    this.reclamo.cliente = reclamo.cliente;
    this.reclamo.administrador = reclamo.administrador;
  }

  obtenerReclamos(): void {
    this.idAdmin = Number(localStorage.getItem("localIdPersona"))
    this.reclamoService.getReclamosNotificacion(this.idAdmin).subscribe(
      data => {
        this.listaReclamos = data;
        console.log("EXITO RECLAMOS OBTENIDOS!!");

      }
    );
  }

  marcarComoAtendido(reclamo: any) {
    this.reclamoService.updateReclamos(this.reclamo, this.reclamo.idReclamo).subscribe(
      data => {
        this.reclamo.idReclamo = data.idReclamo;

        console.log(data);

        this.obtenerReclamos();
      }
    )
    this.limpiar(); this.limpiar();
  }


  limpiar() {
    this.displayEU = false;
    this.reclamo = new Reclamos;
    this.loading = true;
    this.listaReclamos = [];
    this.obtenerReclamos();
    this.obtenerReclamos2();
  }
  obtenerReclamos2() {
    this.idAdmin = Number(localStorage.getItem("localIdPersona"))
    this.reclamoService.getReclamosNotificacion(this.idAdmin).subscribe(
      (reclamos: any[]) => {
        this.notificacionesPendientes = reclamos.length;
        this.notificaciones = reclamos;
        const index = this.notificaciones.indexOf(reclamos);
        if (index !== -1) {
          this.notificaciones.splice(index, 1);
          this.notificacionesPendientes = this.notificaciones.length;
        }
      }
    );
  }

  mostrarNotificaciones() {
    this.notificacionesMostradas = !this.notificacionesMostradas;
  }

  rutaActual: string;
  cambiarRuta(ruta: string) {
    // Cambiar la ruta y actualizar la variable de estado
    this.router.navigateByUrl(ruta);
    this.rutaActual = ruta;
  }


}