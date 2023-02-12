import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Registro_Damage } from "src/app/core/models/registro_damage";

@Injectable({
    providedIn: 'root'
})
export class Registro_DamageService{
    private URL = "http://localhost:5000/registroDamage/";
    constructor(private http:HttpClient){}

    postRegistroDamage(registro_damage: Registro_Damage){
        return this.http.post<Registro_Damage>(this.URL + 'cr',registro_damage);
    }
}