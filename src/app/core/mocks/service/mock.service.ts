import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Categoria } from '../../interfaces/categoria';
import { Proveedor } from '../../interfaces/proveedor';
import { UnidadMedida } from '../../interfaces/unidad-medida';
import { CATEGORIAS } from '../mock-categoria';
import { PROVEEDORES } from '../mock-proveedor';
import { UNIDADMEDIDA } from '../mock-unidad-medida';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }
  getProveedores(): Observable<Proveedor[]> {
    return of(PROVEEDORES);
  }
  getCategorias(): Observable<Categoria[]> {
    return of(CATEGORIAS);
  }
  getUnidades(): Observable<UnidadMedida[]> {
    return of(UNIDADMEDIDA);
  }
}
