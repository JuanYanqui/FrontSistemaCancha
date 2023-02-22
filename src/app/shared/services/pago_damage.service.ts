import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pago_Damage } from "src/app/core/models/pago_damage";

@Injectable({
    providedIn: 'root'
})
export class Pago_DamageService{
    private URL="http://localhost:5000/pagoDamage/";
    constructor(private http:HttpClient){}
    
    postPago(pagoDamage:Pago_Damage){
        return this.http.post<Pago_Damage>(this.URL+'cr',pagoDamage);
    }

    getPagoRegis(){
        return this.http.get<Pago_Damage[]>(this.URL+'li');
    }

    putPago(pago_damage:Pago_Damage,idPago:any){
        return this.http.put<Pago_Damage>(this.URL+`up/${idPago}`,pago_damage);
    }

    getPago(idPersona:number){
        return this.http.get<Pago_Damage[]>(this.URL+'lipd/'+idPersona);
    }
}