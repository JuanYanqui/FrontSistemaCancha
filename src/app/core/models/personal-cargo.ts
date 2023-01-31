

import { Cargo } from "./cargo";
import { Personal } from "./personal";
import { Bodega } from "../interfaces/bodega";

export class PersonalCargo {

    idPersonalCargo: number = 0;
    estado: boolean = false;
    personal?: Personal;
    cargo?: Cargo;
    bodega?: Bodega;
}