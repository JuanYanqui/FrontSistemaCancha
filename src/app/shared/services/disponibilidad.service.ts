import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disponibilidad } from 'src/app/core/models/disponibilidad';
import { Persona } from 'src/app/core/models/persona';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {

  private URL = "http://localhost:5000/disponibilidad/";

  constructor(private http: HttpClient) { }

  getDisponibilidad() {
    return this.http.get<Disponibilidad[]>(this.URL + 'li');
  }


  postDisponibilidad(disponibilidad: Disponibilidad) {
    return this.http.post<Disponibilidad>(this.URL + 'cre', disponibilidad);
  }

  deleteCanchas(idDisponibilidad: number) {
    return this.http.delete<boolean>(this.URL + `eli/${idDisponibilidad}`);
  }

  getPorId(idDisponibilidad: any) {
    return this.http.get<Disponibilidad>(this.URL + idDisponibilidad);
  }

  // getDisponibilidadesPorFechaYHora(fecha: Date, hora: number): Observable<Disponibilidad[]> {
  //   const url = `${this.URL}disponibilidades?fecha=${fecha.toISOString().substring(0,10)}&hora=${hora}`;
  //   return this.http.get<Disponibilidad[]>(url);
  // }

  // getDisponibilidadesPorFechaYHora(fecha: Date, hora: number): Observable<Disponibilidad[]> {
  //   const params = new HttpParams()
  //     .set(new, fecha)
  //     .set('hora', hora);
  //   return this.http.get<Disponibilidad[]>('disponibilidades', { params });
  // }

  // getDisponibilidadesPorFechaYHora(fecha: Date, hora: number, idCancha: number): Observable<Disponibilidad[]> {
  //   const params = new HttpParams()
  //     .set('fecha', fecha.toString())
  //     .set('hora', hora.toString())
  //     .set('idCancha', idCancha.toString());
  
  //   return this.http.get<Disponibilidad[]>(this.URL+ 'disponibilidades', { params });
  // }

  getDisponibilidadesPorFechaYHora(fecha: Date, hora: number, idCancha: number): Observable<Disponibilidad[]> {
    const url = `${this.URL+'disponibilidades/'}?fecha=${fecha}&hora=${hora}&canchaId=${idCancha}`;
    return this.http.get<Disponibilidad[]>(url);
  }
}