import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { Cliente } from 'src/app/core/models/cliente';
import { Empresa } from 'src/app/core/models/empresa';
import { Usuario } from 'src/app/core/models/usuario';
import { ClientesService } from 'src/app/modules/empresa-admin/services/clientes.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { ListxslService } from '../../../listxsl.service';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {

  listaClientes: any = [];
  datos: any;
  arraySelected: any = [];
  loading: any;
  displayMaximizable: any;
  ocultar: any;
  datainicialCliente: any;
  clientes: Cliente = new Cliente()
  empresa: Empresa = new Empresa;

  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";

  constructor(private toastr: ToastrService, private root: Router, private serviceClientes: ClientesService, private servicePersonas: PersonaService, private usuarioService: UsuarioService, private Listxs: ListxslService) { }
  ngOnInit(): void {
    this.obtenerEmpresa();
  }
  exportToexcel(): void {

    this.Listxs.exportToexcel(this.datasource.data, 'my_export');
  }

  obtenerEmpresa() {
    let idUsuario = localStorage.getItem('idUsuario');
    this.usuarioService.getPorId(idUsuario).subscribe(
      data => {
        // this.empresa = data.empresa!;

        console.log(this.empresa);
        this.listar();
      }
    )
  }
  listar() {
    this.serviceClientes.getByEmpresa(this.empresa.idEmpresa).subscribe(data => {
      this.listaClientes = data
      console.log(this.listaClientes)
    })
  }
  agregar() {
    this.root.navigate(['clientes'])
  }
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  editar(nombre: any) {
    var tipo = "false"
    this.datainicialCliente = [nombre, tipo]
    console.log(this.datainicialCliente)
    this.showMaximizableDialog()
  }
  ver(nombre: any) {
    var tipo = "true"
    this.datainicialCliente = [nombre, tipo]
    console.log(this.datainicialCliente)
    this.showMaximizableDialog()
  }
  actualizarEstado(mensaje: any) {
    let accion: string;
    let usuario: Usuario;
    this.serviceClientes.porId(mensaje).subscribe(data => {
      this.clientes = data
      // usuario = this.clientes.usuario!;
      // if (this.clientes.estado == true) {
      //   this.clientes.estado = false;
      //   usuario.estado = false;
      //   accion = 'Cliente Deshabilitado';
      // } else if (this.clientes.estado == false) {
      //   this.clientes.estado = true;
      //   usuario.estado = true;
      //   accion = 'Cliente Habilitado';
      // }
      console.log(this.clientes)

      this.usuarioService.updateUsuario(usuario, usuario.idUsuario).subscribe(
        result => {
          console.log(result);
          this.serviceClientes.updateclientes(this.clientes, mensaje).subscribe(data => {
            console.log(data)
            this.toastr.warning(accion, 'Advertencia!')
            this.listar()
          })
        }
      );
    })
  }

  extractData(datosTabla: any) {
    return datosTabla.map((row: any) => [row.idCliente, row.usuario?.persona?.cedula, row.usuario?.persona?.nombres, row.usuario?.persona?.apellidos, row.estado]);
  }
  async generaraPDF() {
    if (this.arraySelected <= 0) {
      alert("Seleccione uno o todos los usuarios para poder generara el pdf")
    } else {
      console.log(this.arraySelected)
      const pdf = new PdfMakeWrapper();
      pdf.pageOrientation('portrait')
      pdf.pageSize('A4')
      pdf.add(pdf.ln(2))
      pdf.add(new Txt("Reporte Clientes").bold().italics().alignment('center').end);
      pdf.add(pdf.ln(2))
      pdf.add(new Table([
        ['Codigo', 'Cedula', 'Nombres', 'Apellidos', 'Estado'],
      ]).widths(['*', '*', '*', '*', '*']).layout(
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


  displayedcolumns: string[] = ['codigo', 'cedula', 'nombres', 'apellidos', 'estado'];
  datasource = new MatTableDataSource(this.extractData(this.arraySelected));


}
