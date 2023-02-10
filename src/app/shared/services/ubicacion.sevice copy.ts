import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { Ubicacion } from 'src/app/core/models/ubicacion';
import { Usuario } from 'src/app/core/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  private URL = "http://localhost:5000/ubicacion/";

  constructor(private http: HttpClient) { }

  getUbicacion() {
    return this.http.get<Ubicacion[]>(this.URL + 'li');
  }
 
  postUbicacion(ubicacion: Ubicacion) {
    return this.http.post<Ubicacion>(this.URL + 'cre', ubicacion);
  }


}