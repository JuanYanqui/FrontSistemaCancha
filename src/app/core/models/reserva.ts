import { Disponibilidad } from "./disponibilidad";
import { Persona } from "./persona";

export class Reserva {
    
    idReserva: number = 0;
    estado: boolean = false;
    cliente!: Persona;
    disponibilidades: Disponibilidad[] = [];
}