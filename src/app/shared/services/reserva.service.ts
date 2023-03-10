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

  Reservasporcliente(idPersona: any) {
    return this.http.get<any>(this.URL+`cliente/${idPersona}`);
  }

  getReservasPorPersona(idPersona: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.URL + `reservasporpersona/${idPersona}`);
  }

  actualizarEstado(idReserva: number, estado: boolean): Observable<Reserva> {
    const url = `${this.URL}reservas/${idReserva}/estado?estado=${estado}`;
    return this.http.put<Reserva>(url, {});
  }

}