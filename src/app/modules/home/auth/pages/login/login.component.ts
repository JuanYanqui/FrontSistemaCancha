import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/core/models/usuario';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: Usuario = new Usuario;
  tipoUser: any;
  user: any;
  establecimiento: any;

  usuarios: any[] = [
    { usu: 'Visita' }, { usu: 'Cliente' }, { usu: 'Empleado de empresa' }, { usu: 'Administrador de empresa' }, { usu: 'Administrador' }, { usu: 'Super administrador' },
  ];

  constructor(private toastr: ToastrService, private usuarioService: UsuarioService , private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('idUsuario');
    sessionStorage.removeItem('productosPedido');
  }

  login() {
    this.usuarioService.login(this.usuario.username, this.usuario.password).subscribe(
      data => {
        console.log(data);
        if (data != null) {

          if (data.estado) {
            this.usuario.idUsuario = data.idUsuario;
            // this.empresa = data.empresa?.logo;
            localStorage.setItem("localIdPersona", String(data.persona?.idPersona));
            
            this.user = data.persona?.foto
            this.toastr.success("Bienvenido " + data.username, "Login");
            localStorage.setItem('idUsuario', String(this.usuario.idUsuario));
            localStorage.setItem('nameImagen', String(this.user));
            localStorage.setItem('nameLogo', String(this.establecimiento));

            location.replace('/adminsitrador/bienvenida')
          } else {
            this.toastr.warning("Usuario inhabilitado, no puede ingresar!", "Advertencia!");
            this.usuario = new Usuario;
          }

        } else {
          this.toastr.error("USERNAME O PASSWORD INCORRECTOS!", "Login");
          this.usuario = new Usuario;

        }

      }
    )
  }

}
