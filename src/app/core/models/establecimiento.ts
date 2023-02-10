
import { Persona } from "./persona";
import { Ubicacion } from "./ubicacion";

export class Establecimiento {
    
    idEstablecimiento: number = 0;
    ruc: string = "";
    nombre: string = "";
    puntuacion: number = 0;
    horaApertura?: Date;
    horaCierre?: Date;
    bar: boolean = false;
    estacionamiento: boolean = false;
    vestidores: boolean = false;
    banios: boolean = false;
    estado: boolean = false;
    provincia: string = "";
    ciudad: string = "";
    direccion: string = "";
    codigoPostal: string = "";
    fotoestablecimiento?: String;
    persona?: Persona;
    ubicacion?: Ubicacion;
}