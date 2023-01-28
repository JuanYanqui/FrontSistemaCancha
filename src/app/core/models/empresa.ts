import { Persona } from './persona';

export class Empresa {
    
    idEmpresa: number = 0;
    ruc: string = "";
    mision: string = "";
    vision: string = "";
    nombre: string = "";
    acronimo: string = "";
    iva: number = 0;
    rolComercial: string = "";
    logo: string = "";
    pais: string = "";
    provincia: string = "";
    ciudad: string = "";
    direccion: string = "";
    codigoPostal: string = "";
    telefono: string = "";
    celular: string = "";
    correo: string = "";
    paginaWeb: string = "";
    estado: boolean = false;
    cuentasBancarias!: string[];

    persona?: Persona;
}
