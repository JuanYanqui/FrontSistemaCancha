
import { Persona } from "./persona";
import { Rol } from "./roles";

export class Usuario {

    idUsuario: number = 0;
    username: string = "";
    password: string = "";
    estado: boolean = false;
    persona?: Persona;
    rol?: Rol;
}