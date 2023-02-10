import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { Usuario } from 'src/app/core/models/usuario';

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

}
