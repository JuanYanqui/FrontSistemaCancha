import { Registro_Damage } from "./registro_damage";

export class Pago_Damage{
    idPago:number=0;
    foto:string="";
    fecha_pago?:Date;
    estado:string="";
    registroDamage?:Registro_Damage;
}