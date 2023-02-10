import { Empresa } from 'src/app/core/models/empresa';
import { Proveedor } from 'src/app/core/models/proveedor'; 
import { Compra } from './compra';
export interface CompraDetail {
  id: number;
  estado: string;
  compras: Compra[];
  fecha_pedido: Date;
  empresa:Empresa;

  valor_total: number;
}
