import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/core/interfaces/producto';
import { Empresa } from 'src/app/core/models/empresa';
import { Proveedor } from 'src/app/core/models/proveedor';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { ProveedorService } from 'src/app/modules/empresa-admin/services/proveedor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrls: ['./edit-proveedor.component.css']
})
export class EditProveedorComponent implements OnInit {

  @Input() datainicial: any;
  @ViewChild('asInpRUC')
  rucPRO!: ElementRef;
  @ViewChild('asInpNOMB')
  nombrePRO!: ElementRef;
  @ViewChild('asInpEMAIL')
  emailPRO!: ElementRef;
  @ViewChild('asInpWEB')
  webPRO!: ElementRef;
  @ViewChild('asInpTELF')
  telefonoPRO!: ElementRef;
  @ViewChild('asInpCEL')
  celPRO!: ElementRef;
  @ViewChild('asInpNOMBANC')
  NomBancPRO!: ElementRef;
  @ViewChild('asInpTCUEN')
  cuentaBancPRO!: ElementRef;
  @ViewChild('asInpNUMCU')
  numCuenBancPRO!: ElementRef;
  @ViewChild('asInpNOMTI')
  nomTituBancoPRO!: ElementRef;
  @ViewChild('asBtnBNC')
  btnBNCPRO!: ElementRef;
  @ViewChild('asBtnBNCDE')
  btndeltBancPRO!: ElementRef;
  @ViewChild('asInpOBSER')
  obserPRO!: ElementRef;
  @ViewChild('asBtnSAVE')
  btnSavePRO!: ElementRef;
  @ViewChild('asbtnVER')
  btnVerPRO!: ElementRef;
  @ViewChild('asbtnEDITAR')
  btnEditPRO!: ElementRef;
  @ViewChild('asbtnReg')
  btnregrePRO!: ElementRef;
  @ViewChild('aslblNumCuenta')
  lblNumCuen!: ElementRef;
  @ViewChild('asSelecTipCuen')
  selectTipCuen!: ElementRef;
  @ViewChild('asTipCuent')
  lbltipCuent!: ElementRef;
  @ViewChild('aslblNomtit')
  lblNomtit!: ElementRef;
  proveedor: Proveedor = new Proveedor();

  nombreBanco: any;
  tipoCuenta: any;
  numeroCuenta: any;

  cuentas: string[] = [];
  cuentaBancaria: string = '';

  estadoBtns: any = 1;
  borrrar: any;
  estadoProveedor: any;
  nombretitular: any;
  loading: boolean = true;
  listaProveedores: any;
  listaProductospROVE: any;
  idEMpresa: any;
  listBancos: any = [];
  empresa: Empresa = new Empresa();
  proveedor2: any;
  producto!: Producto;
  blockSpecialCedula: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/
  blockSpecial: RegExp = /^[^<>*!$%^=+?`\|{}[\]~"'\\=/;:]+$/

  constructor(private toastr: ToastrService, private usuarioService: UsuarioService, private proveedorServie: ProveedorService, private productosService: ProductosService) { }

  ngOnInit(): void {
    this.obtenerEmpresa()
    this.loading = false
  }

  actualizarProveedor() {
    const codigo = this.datainicial
    this.proveedor.cuentasBancarias = this.listBancos
    this.proveedorServie.updateProveedor(this.proveedor, codigo).subscribe(data => {
      alert("Proveedor actualizado")
    })
  }

  buscarProveedor() {
    this.proveedorServie.listarporId(this.datainicial).subscribe(data => {
      this.proveedor = data
      this.productosService.getProductsByEmpresa(this.empresa.idEmpresa).subscribe(data1 => {
        this.listaProveedores = data1
        /*        for(let i of data1){
                  this.producto=i
                  this.proveedor2=this.producto.proveedores
                  console.log(this.proveedor2.idProveedor)
                  if(this.proveedor2.idProveedor==this.proveedor.idProveedor){
                    this.listaProveedores.push(data1)
                  }
                }*/
      })
      this.listBancos = data.cuentasBancarias
    })
  }

  obtenerEmpresa() {
    let idUsuario = localStorage.getItem('idUsuario');
    this.usuarioService.getPorId(idUsuario).subscribe(
      data => {

      }
    )
  }

  editarProveedor() {
    this.borrrar = 1
    this.estadoBtns = 0
    this.estadoProveedor = 0
    setTimeout(() => {
      this.buscarProveedor()
    }, 100)
  }

  verProveedor() {
    this.borrrar = 0;
    this.estadoBtns = 0
    this.estadoProveedor = 0
    setTimeout(() => {
      const numerocuenta = this.lblNumCuen.nativeElement;
      const selctedCuen = this.selectTipCuen.nativeElement;
      const tipCuentlbl = this.lbltipCuent.nativeElement;
      const nomtitu = this.lblNomtit.nativeElement;
      const ruc = this.rucPRO.nativeElement;
      const nombreProveedor = this.nombrePRO.nativeElement;
      const emailProveedor = this.emailPRO.nativeElement;
      const webProveedor = this.webPRO.nativeElement;
      const telefonoProveedor = this.telefonoPRO.nativeElement;
      const celularProveedor = this.celPRO.nativeElement;
      const nombreBanco = this.NomBancPRO.nativeElement;
      const cuentaBancaria = this.cuentaBancPRO.nativeElement;
      const numeroCuencaBanca = this.numCuenBancPRO.nativeElement;
      const nombreTituBanco = this.nomTituBancoPRO.nativeElement;
      const btnSaveBanco = this.btnBNCPRO.nativeElement;
      const observacionesPro = this.obserPRO.nativeElement;
      const btnSaveProveedor = this.btnSavePRO.nativeElement;
      numerocuenta.style.display = 'none';
      selctedCuen.style.display = 'none';
      tipCuentlbl.style.display = 'none';
      nomtitu.style.display = 'none';
      btnSaveBanco.style.display = 'none';
      btnSaveProveedor.style.display = 'none';
      observacionesPro.disabled = true;
      ruc.disabled = true;
      nombreProveedor.disabled = true;
      emailProveedor.disabled = true;
      webProveedor.disabled = true;
      telefonoProveedor.disabled = true;
      celularProveedor.disabled = true;
      nombreBanco.style.display = 'none';
      cuentaBancaria.style.display = 'none';
      numeroCuencaBanca.style.display = 'none';
      nombreTituBanco.style.display = 'none';
      this.buscarProveedor()
    }, 100);
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

  regresarbtn() {
    this.estadoBtns = 1
    this.estadoProveedor = 1
    this.vaciarcampos()
  }

  vaciarcampos() {
    this.proveedor.celularProveedor = ""
    this.proveedor.cuentasBancarias = []
    this.proveedor.emailProveedor = ""
    this.proveedor.nombreProveedor = ""
    this.proveedor.observaciones = ""
    this.proveedor.paginaWeb = ""
    this.proveedor.ruc = ""
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

  limpiarCampos() {
    this.proveedor.ruc = ""
    this.proveedor.nombreProveedor = ""
    this.proveedor.celularProveedor = ""
    this.proveedor.emailProveedor = ""
    this.proveedor.observaciones = ""
    this.proveedor.paginaWeb = ""
    this.proveedor.telefonoProveedor = ""
    this.listBancos = null
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
