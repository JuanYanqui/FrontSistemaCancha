import { Usuario } from './usuario';

export class Personal {

    idPersonal?: number;
    horario?: string;
    salario?: number;
    estado?: boolean;
    fechaRegistro?: Date;
    lugarTrabajo?: string;
    fotoPerfil!: string;

    usuario?: Usuario;
}
