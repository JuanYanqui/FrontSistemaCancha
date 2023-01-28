
import { Producto } from "../interfaces/producto";
import { Pedido } from "./pedido";

export class ItemPedido {

    idItemPedido: number = 0;
    cantidad: number = 0;
    precio: number = 0;
    subtotal: number = 0;
    tipoUnidad: string = "";
    valUnidad: number = 0;
    tipoPrecio: string = "";
    unidadTotal: number = 0;

    producto?: Producto;
    pedido?: Pedido;
}