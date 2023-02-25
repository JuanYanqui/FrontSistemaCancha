import { Disponibilidad } from "./disponibilidad";
import { Persona } from "./persona";

export class Reserva {
    
    idReserva: number = 0;
    cliente!: Persona;
    disponibilidades: Disponibilidad[] = [];
}