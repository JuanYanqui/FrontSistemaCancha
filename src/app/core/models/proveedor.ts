import { Empresa } from "./empresa";

export class Proveedor {

    idProveedor: number = 0;
    ruc: string = "";
    nombreProveedor: string = "";
    estado: boolean = false;
    fechaRegistro: Date | undefined;
    cuentasBancarias?: String[];
    giroProveedor: string = "";
    observaciones: string = "";
    emailProveedor: string = "";
    celularProveedor: string = "";
    telefonoProveedor: string = "";
    paginaWeb: string = "";
    empresa: Empresa | undefined;
}
