import { Administrador } from "./administrador";
import { Cliente } from "./cliente";
import { Persona } from "./persona";


export class Reclamos {

    idReclamo?: number;
    titulo: string;
    descripcion: string;
    fecha_reclamo?: Date;
    administrador?: Persona
    cliente?: Persona
}