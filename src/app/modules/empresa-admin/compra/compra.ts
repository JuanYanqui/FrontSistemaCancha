import { Proveedor } from "src/app/core/models/proveedor";
import { Producto } from "src/app/core/interfaces/producto"; 
export interface Compra {
  id?: number;
  producto: Producto;
  cantidad: number;
  cantidad_unitarias: number;
  unidad: string;
  valor_total: number;
  proveedor: Proveedor;
}
