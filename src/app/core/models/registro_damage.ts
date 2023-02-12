import { Persona } from "./persona";
import { Establecimiento } from "./establecimiento";

export class Registro_Damage{
    idDamage:number=0;
    descripcion:string="";
    valor:number=0;
    cliente?:Persona;
    establecimiento?:Establecimiento;
}