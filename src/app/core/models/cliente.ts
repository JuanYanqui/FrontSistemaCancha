
import { Persona } from "./persona";
import { Usuario } from "./usuario";

export class Cliente {
    
    idCliente: number = 0;
    lista_negra: boolean = false;
    persona?: Persona;
}
