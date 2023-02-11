import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CargarscriptsService } from '../../services/cargarscripts.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar-empresa-admin',
  templateUrl: './sidebar-empresa-admin.component.html',
  styleUrls: ['./sidebar-empresa-admin.component.css']
})
export class SidebarEmpresaAdminComponent implements OnInit, OnDestroy {
  
  items: MenuItem[] | any;
  idUsuario: any;
  nombreUsuario: any;
  nombreRol: any;
  nombreFoto: any;
  nombreLogo: any;

  isSuperAdmin: boolean = false;
  isClientAdmin: boolean = false;
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
    private router: Router,


  ) {
    {
      _CargarScripts.carga(["script"])
    }
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
          this.isLogin = true;

          this.nombreUsuario = data.persona?.nombre + ' ' + data.persona?.apellido;
          this.nombreRol = data.rol?.nombre
          console.log("Found the user => " + this.nombreFoto);

          switch (data.rol?.nombre) {
            case 'INVITADO':
              this.isSuperAdmin = false;
              this.isClientAdmin = false;
              this.isClient = false;
              this.isPublic = true;
              break;
            case 'CLIENTE':
              this.isSuperAdmin = false;
              this.isClientAdmin = false;
              this.isClient = true;
              this.isPublic = true;
              break;
            case 'CLIENTE ADMINISTRADOR':
              this.isSuperAdmin = false;
              this.isClientAdmin = true;
              this.isClient = false;
              this.isPublic = false;
              break;
            case 'SUPER ADMINISTRADOR':
              this.isSuperAdmin = true;
              this.isClientAdmin = false;
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


}