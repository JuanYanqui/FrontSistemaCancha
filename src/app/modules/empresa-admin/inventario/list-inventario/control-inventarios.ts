import { Empresa } from "src/app/core/models/empresa"; 
import { Bodega } from "src/app/core/interfaces/bodega"; 
import { CompraDetail } from "../../compra/compradetail"; 

export interface ControlInventarios {
    id?: number;

    stock_min: number;
    stock_max: number;
    fecha_elaboracion: Date;
    fecha_caducidad: Date;
    detalleCompras: CompraDetail;
    bodega: Bodega;
    empresa: Empresa;

}
