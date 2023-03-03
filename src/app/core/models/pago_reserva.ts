import { Reserva } from "./reserva";

export class Pago_Reserva{
    idPagoReserva:number=0;
    foto:string="";
    estadopago!:string;
    fecha_pago: Date = new Date;
    valor!:number;
    reserva?:Reserva;

}