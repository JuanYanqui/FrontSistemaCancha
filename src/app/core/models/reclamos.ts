import { Persona } from "./persona";


export class Reclamos {

    idReclamo?: number;
    titulo: string ="";
    descripcion: string ="";
    fecha_reclamo?: Date;
    administrador?: Persona
    cliente?: Persona
}