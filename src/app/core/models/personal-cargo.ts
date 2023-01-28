

import { Cargo } from "./cargo";
import { Personal } from "./personal";

export class PersonalCargo {

    idPersonalCargo: number = 0;
    estado: boolean = false;
    personal?: Personal;
    cargo?: Cargo;
}