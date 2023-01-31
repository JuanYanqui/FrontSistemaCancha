
import { Empresa } from '../models/empresa';
import { PersonalCargo } from '../models/personal-cargo';

export interface Bodega {

    id: number;
    nombre: string;
    tipobodega: string;
    direccion: string;
    localidad: string;
    capacidad_max: number;
    inventario_disponible: number;
    telefono: string;
    descripcion: string;
    personalCargos: PersonalCargo[];
    estado: boolean;
    empresa: Empresa;
}
