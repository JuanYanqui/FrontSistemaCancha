import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Establecimiento } from 'src/app/core/models/establecimiento';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {

  private URL = "http://localhost:5000/establecimiento/";

  constructor(private http: HttpClient) { }

  getEstablecimiento() {
    return this.http.get<Establecimiento[]>(this.URL + 'li');
  }

  postEstablecimiento(establecimiento: Establecimiento) {
    return this.http.post<Establecimiento>(this.URL + 'cre', establecimiento);
  }

  updateEstablecimiento(establecimiento: Establecimiento, idEstablecimiento: any) {
    return this.http.put<Establecimiento>(this.URL + `upd/${idEstablecimiento}`, establecimiento);
  }

  getPorRuc(ruc: any) {
    return this.http.get<Establecimiento>(this.URL + `byRuc/${ruc}`);
  }

  getPorId(idEstablecimiento: any) {
    return this.http.get<Establecimiento>(this.URL + idEstablecimiento);
  }

  getByPersona(idPersona: any):Observable<any>{
    return this.http.get<Establecimiento[]>(`${this.URL}listbypersona/${idPersona}`)

  }

  getListarEst(idPersona : number){
    return this.http.get<Establecimiento[]>(this.URL+ 'lip/'+idPersona)
}

}
