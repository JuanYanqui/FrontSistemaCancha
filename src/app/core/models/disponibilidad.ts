import { Canchas } from "./canchas";

export class Disponibilidad {
    
    idDisponibilidad: number = 0;
    fecha= new Date;
    hora!: number;
    estado!: boolean;
    cancha?: Canchas ;
}