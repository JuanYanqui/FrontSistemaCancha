import { Establecimiento } from "./establecimiento";

export class Canchas {
    idCancha: number = 0;
    nombre: string = "";
    descripcion: string = "";
    tarifa: string = "";
    altura: number = 0;
    ancho: number = 0;
    vacante: boolean = false;
    foto: string = "";
    establecimiento?: Establecimiento;
    
}
