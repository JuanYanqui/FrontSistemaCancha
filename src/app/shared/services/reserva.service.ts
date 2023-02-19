import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/core/models/persona';
import { Reserva } from 'src/app/core/models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private URL = "http://localhost:5000/reserva/";

  constructor(private http: HttpClient) { }

  // getReservas() {
  //   return this.http.get<Reserva[]>(this.URL + 'li');
  // }

  getReservas(): Observable<Reserva[]> { // Aquí se define que se espera un array de objetos de tipo Evento
    return this.http.get<Reserva[]>(this.URL + 'li');
  }
  postReservas(reserva: Reserva) {
    return this.http.post<Reserva>(this.URL + 'cre', reserva);
  }


}