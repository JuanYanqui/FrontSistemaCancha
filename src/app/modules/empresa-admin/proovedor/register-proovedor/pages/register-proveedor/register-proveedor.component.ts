import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/core/models/empresa';
import { Proveedor } from 'src/app/core/models/proveedor';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { ProveedorService } from 'src/app/modules/empresa-admin/services/proveedor.service';

@Component({
  selector: 'app-register-proveedor',
  templateUrl: './register-proveedor.component.html',
  styleUrls: ['./register-proveedor.component.css']
})
export class RegisterProveedorComponent implements OnInit {

  proveedor: Proveedor = new Proveedor;
  empresa: Empresa = new Empresa;

  cuentaBancaria: string = '';
  cuentas: string[] = [];

  bancocoop: any;
  tipocuenta: any;

  nombreBanco: string = '';
  tipoCuenta: string = '';
  numeroCuenta: string = '';
  nombretitular: string = '';

  listBancos: any = [];

  bancos: string[] = [
    'Pichincha', 'JEP', 'Banco Guayaquil'
  ];
  tipocuentas: string[] = [
    'Corriente', 'Ahorros'
  ];

  name: string = '';

  fechaRegistro: any;
  data: any;

  blockSpecialCedula: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/
  blockSpecial: RegExp = /^[^<>*!$%^=+?`\|{}[\]~"'\\=/;:]+$/

  constructor(private toastr: ToastrService, private usuarioService: UsuarioService, private serviceProveedor: ProveedorService) { }

  ngOnInit(): void {
    this.obtenerEmpresa();
  }

  obtenerEmpresa() {
    let idUsuario = localStorage.getItem('idUsuario');
    this.usuarioService.getPorId(idUsuario).subscribe(
      data => {
        // this.empresa = data.empresa!;

        console.log(this.empresa);
      }
    )
  }

  crearProveedor() {
    if (this.validarCampos() == 0) {
      this.fechaRegistro = new Date();
      this.proveedor.estado = true;
      this.proveedor.cuentasBancarias = this.listBancos
      this.proveedor.fechaRegistro = this.fechaRegistro;
      this.proveedor.empresa = this.empresa
      this.serviceProveedor.save(this.proveedor).subscribe(data => {
        this.toastr.success('Proveedor registrado correctamente', 'Registro exitoso!');
        this.limpiarCampos();
        console.log(data)
      })
    } else {
      this.toastr.warning('Verifique los campos del proveedor', 'Aviso!')
    }
  }

  agregarCuentaBancaria() {
    if (this.nombreBanco != '' && this.tipoCuenta != '' && this.numeroCuenta != '' && this.nombretitular != '') {
      this.cuentaBancaria = 'BANCO/COOPERATIVA: ' + this.nombreBanco + ' TIPO DE CUENTA: ' + this.tipoCuenta + ' NÚMERO: ' + this.numeroCuenta + ' TITULAR: ' + this.nombretitular;
      this.listBancos.push(this.cuentaBancaria);
      this.nombreBanco = '';
      this.tipoCuenta = '';
      this.numeroCuenta = '';
      this.nombretitular = '';
    } else {
      this.toastr.warning('Rellene todos los campos de cuenta bancaria', 'Aviso!')
      console.log(this.nombreBanco);
    }

  }

  quitarCuentaBancaria(i: any) {

    delete this.listBancos[i];

    for (let index = 0; index < this.listBancos.length; index++) {
      if (this.listBancos[index] != null || this.listBancos[index] === '') {
        this.cuentas.push(this.listBancos[index]);
      }
    }

    this.listBancos = this.cuentas;
  }

  limpiarCampos() {

    this.proveedor.ruc = '';
    this.proveedor.nombreProveedor = '';
    this.proveedor.celularProveedor = '';
    this.proveedor.emailProveedor = '';
    this.proveedor.observaciones = '';
    this.proveedor.paginaWeb = '';
    this.proveedor.telefonoProveedor = '';
    this.listBancos = null;
  }

  validarCampos() {

    var verificacion = 0
    if (this.proveedor.ruc == null || this.proveedor.ruc.length <= 9) {
      verificacion = verificacion + 1;
    } else if (this.proveedor.nombreProveedor == null || this.proveedor.nombreProveedor.length <= 0) {
      verificacion = verificacion + 1;
    }
    return verificacion
  }
}
