import { Empresa } from "./empresa";
import { Pedido } from "./pedido";
import { Persona } from "./persona";

export class VentaPedido {

    idVentaPedido: number = 0;
    metodoPago: string = "";
    estadoVenta: boolean = false;
    fechaVenta: Date | undefined;
    estadoEntrega: boolean = false;
    fechaEntrega: Date | undefined;
    valorPagar: number = 0;
    valorCaja: number = 0;
    vuelto: number = 0;
    isOnline: boolean = false;
    valorIva: number = 0;
    valorSinIva: number = 0;
    numeroCheque: string = "";
    numeroTarjeta: string = "";

    pedido?: Pedido;
    persona?: Persona;
    empresa?: Empresa;
}