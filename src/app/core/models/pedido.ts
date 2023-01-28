import { Cliente } from "./cliente";

export class Pedido {
    
    idPedido: number = 0;
    fechaPedido!: Date;
    revicion: boolean = false;
    aceptacion: boolean = false;
    fechaRevicion: Date | undefined;

    cliente: Cliente | undefined;
}