import { HttpClient } from '@angular/common/http';
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

}