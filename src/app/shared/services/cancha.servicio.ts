import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Canchas } from 'src/app/core/models/canchas';

@Injectable({
  providedIn: 'root'
})
export class CanchasService {

  private URL = "http://localhost:5000/cancha/";

  constructor(private http: HttpClient) { }

  getCanchas() {
    return this.http.get<Canchas[]>(this.URL + 'li');
  }

  postCanchas(canchas: Canchas) {
    return this.http.post<Canchas>(this.URL + 'cre', canchas);
  }

  putCanchas(canchas: Canchas, idCancha: any) {
    return this.http.put<Canchas>(this.URL + `upd/${idCancha}`, canchas);
  }

  deleteCanchas(idCanchas: number) {
    return this.http.delete<boolean>(this.URL + `eli/${idCanchas}`);
  }

  getPorId(idCanchas: any) {
    return this.http.get<Canchas>(this.URL + idCanchas);
  }

  getByEstablecimiento(idEstablecimiento: any):Observable<any>{
    return this.http.get<Canchas[]>(`${this.URL}listbyestablecimiento/${idEstablecimiento}`)
  }
}
