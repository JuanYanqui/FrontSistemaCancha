import { Disponibilidad } from "./disponibilidad";
import { Persona } from "./persona";

export class Reserva {
    
    idReserva: number = 0;
    fecha_entrada: Date= new Date;
    fecha_salida: Date = new Date;
    persona?: Persona;
    disponibilidad?: Disponibilidad;
}