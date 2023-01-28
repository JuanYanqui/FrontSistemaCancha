import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/core/models/cliente';
import { Empresa } from 'src/app/core/models/empresa';
import { ItemPedido } from 'src/app/core/models/item-pedido';
import { Pedido } from 'src/app/core/models/pedido';
import { Usuario } from 'src/app/core/models/usuario';
import { ClientesService } from 'src/app/modules/empresa-admin/services/clientes.service';
import { ItemPedidoService } from 'src/app/modules/empresa-admin/services/item-pedido.service';
import { PedidoService } from 'src/app/modules/empresa-admin/services/pedido.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-register-pedido',
  templateUrl: './register-pedido.component.html',
  styleUrls: ['./register-pedido.component.css']
})
export class RegisterPedidoComponent implements OnInit {

  cliente: Cliente = new Cliente;
  listaPedidos: Pedido[] = [];
  loading: boolean = true;
  pedido: Pedido = new Pedido;
  listaItemsPedido: ItemPedido[] = [];
  displayVP: boolean = false;

  total: any;

  constructor(private toastr: ToastrService, private itemPedidoService: ItemPedidoService, private pedidoService: PedidoService, private usuarioService: UsuarioService, private clienteService: ClientesService) { }

  ngOnInit(): void {
    this.obtenerCliente();
  }

  obtenerCliente() {
    let usuario: Usuario = new Usuario;
    let empresa: Empresa = new Empresa;

    let idUsuario = localStorage.getItem('idUsuario');
    this.usuarioService.getPorId(idUsuario).subscribe(
      data => {
        usuario = data;
        empresa = data.empresa!;

        this.clienteService.getByEmpresaUsuario(usuario.idUsuario, empresa.idEmpresa).subscribe(
          result => {
            console.log(result);
            this.cliente = result;
            this.obtenerPedidos(this.cliente);
          }
        )
      }
    )
  }

  obtenerPedidos(cliente: Cliente) {
    this.pedidoService.getByCliente(cliente.idCliente).subscribe(
      data => {
        this.listaPedidos = data;
        this.loading = false;
      }
    )
  }

  verPedido(pedido: Pedido) {
    this.pedido = pedido;

    this.itemPedidoService.getByPedido(pedido.idPedido).subscribe(
      data => {
        console.log(data);
        this.listaItemsPedido = data;
        this.displayVP = true;
      }
    )
  }

  obtenerEstado(revicion: boolean, aceptacion: boolean): string {
    let estado: string = '';

    if (revicion && aceptacion) {
      estado = 'ACEPTADO';
    } else if (revicion && !aceptacion) {
      estado = 'RECHAZADO';
    } else if (!revicion && !aceptacion) {
      estado = 'PENDIENTE';
    } else if (!revicion && aceptacion) {
      estado = 'CANCELADO';
    }

    return estado;
  }

  cancelarPedido(pedido: Pedido) {
    pedido.revicion = false;
    pedido.aceptacion = true;
    this.pedidoService.update(pedido, pedido.idPedido).subscribe(
      data => {
        this.toastr.warning('Pedido cancelado!', '')
      }
    )
  }

  habilitarPedido(pedido: Pedido) {
    pedido.revicion = false;
    pedido.aceptacion = false;
    this.pedidoService.update(pedido, pedido.idPedido).subscribe(
      data => {
        this.toastr.warning('Pedido habilitado!', '')
      }
    )
  }

  calcularValorTotalItems(): number {
    this.total = 0;
    this.listaItemsPedido.forEach(item => {
      let precio: any = item.precio;
      let cantidad: any = item.cantidad;
      let unidades: any = item.valUnidad;

      this.total = this.total + (precio * cantidad * unidades);
    });
    return this.total;
  }

  verificarEntrega(): string {
    let estadoEntrega: string = '';
    // if (!this.pedido.entrega){
    //   estadoEntrega = 'PENDIENTE';
    // }else{
    //   estadoEntrega = 'HECHA EL ' + this.pedido.fechaEntrega;
    // }

    return estadoEntrega;
  }
}