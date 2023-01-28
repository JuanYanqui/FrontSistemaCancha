import { Empresa } from "./empresa";
import { Persona } from "./persona";
import { Roles } from "./roles";

export class Usuario {

    idUsuario: number = 0;
    username: string = "";
    password: string = "";
    estado: boolean = false;
    foto?: string;
    persona?: Persona;
    empresa?: Empresa;
    rol?: Roles;
}