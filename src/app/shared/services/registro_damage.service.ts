import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Establecimiento } from "src/app/core/models/establecimiento";
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

    getRegistroDamage(){
        return this.http.get<Registro_Damage[]>(this.URL+ 'li');
    }
    
    putRegistroDamage(registro_damage:Registro_Damage,idDamage:any){
        return this.http.put<Registro_Damage>(this.URL+`up/${idDamage}`,registro_damage);
    }

    


}