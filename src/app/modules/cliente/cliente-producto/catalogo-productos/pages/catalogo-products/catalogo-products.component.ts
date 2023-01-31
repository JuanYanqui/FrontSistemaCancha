import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/core/interfaces/producto';
import { Empresa } from 'src/app/core/models/empresa';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-catalogo-products',
  templateUrl: './catalogo-products.component.html',
  styleUrls: ['./catalogo-products.component.css']
})
export class CatalogoProductsComponent implements OnInit {

  empresa: Empresa = new Empresa;
  listaProductos: Producto[] = [];

  //sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  numItems: number = 0;

  constructor(private router: Router, private toastr: ToastrService, private productoService: ProductosService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerEmpresa();
    // this.sortOptions = [
    //   {label: 'Price High to Low', value: '!price'},
    //   {label: 'Price Low to High', value: 'price'}
    // ];
    this.evitarRepetido(1);
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  obtenerEmpresa() {
    let idUsuario = localStorage.getItem('idUsuario');
    this.usuarioService.getPorId(idUsuario).subscribe(
      data => {
        // this.empresa = data.empresa!;

        this.obtenerProductosEmpresa(this.empresa);

        console.log(this.empresa);
      }
    )
  }

  obtenerProductosEmpresa(empresa: Empresa) {
    this.productoService.getProductsByEmpresa(empresa.idEmpresa).subscribe(
      data => {
        this.listaProductos = data;
        console.log(this.listaProductos);
      }
    )
  }

  agregarAlPedido(producto: Producto) {
    let items: string[] = [];
    let idProductos: any = '';

    idProductos = sessionStorage.getItem('productosPedido');

    if (idProductos != '' && idProductos != null) {
      items = idProductos.split(',');
    }

    if (this.evitarRepetido(producto.id)) {
      this.toastr.warning('El producto ya esta agregado', 'Advertencia!');
    } else {
      items.push(producto.id + '');
      this.toastr.success('Producto agregado al pedido', 'Exitoso!')
    }

    idProductos = '';

    for (let i = 0; i < items.length; i++) {
      const element = items[i];

      if (i === (items.length - 1)) {
        idProductos += element;
      } else {
        idProductos += element + ',';
      }

    }
    this.numItems = items.length;
    sessionStorage.setItem('productosPedido', idProductos);
    console.log(sessionStorage.getItem('productosPedido'));
  }

  evitarRepetido(id: any): boolean {
    let resp: boolean = false;
    let items: string[] = [];
    let idProductos: any = '';

    idProductos = sessionStorage.getItem('productosPedido');

    if (idProductos != '' && idProductos != null) {
      items = idProductos.split(',');
    }

    let i: number = 0;
    while (!resp && items.length > i) {
      const item = items[i];

      if (id + '' === item) {
        resp = true;
      }

      console.log('i ' + i);
      i++;
    }

    this.numItems = items.length;
    return resp;
  }

  verPedido() {
    this.router.navigate(['./empresa-adm/pedidos/list-pedidos']);
  }

  vaciarPedido() {
    sessionStorage.removeItem('productosPedido');
    this.numItems = 0;
  }
}