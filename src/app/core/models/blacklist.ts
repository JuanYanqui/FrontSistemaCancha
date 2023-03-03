import { Reserva } from "./reserva";

export class BlackList {
    
    idBlacklist: number = 0;
    descripcion: string = "";
    fecha_reserva= new Date;
    hora: number = 0;
    idReserva?: Reserva;
}