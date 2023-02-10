
import { Usuario } from "./usuario";

export class Cliente {
    
    idCliente: number = 0;
    observaciones: string = "";
    estado: boolean = false;
    fechaRegistro: Date | undefined;
    usuario?: Usuario;
}
