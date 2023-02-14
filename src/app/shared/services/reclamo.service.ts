import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/core/models/persona';
import { Reclamos } from 'src/app/core/models/reclamos';

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  //private saveRepuesto: string='http://localhost:8080/api/SaveCurso';
  private URL = "http://localhost:5000/";

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getReclamos() {
    return this.http.get<Reclamos[]>(this.URL + 'reclamo/li');
  }

  getAdministrador() {
    return this.http.get<Persona[]>(this.URL + 'persona/li');
  }

  getCliente() {
    return this.http.get<Persona[]>(this.URL + 'persona/li');
  }

  postReclamos(reclamo: Reclamos): Observable<Reclamos>{
    return this.http.post<Reclamos>(this.URL + 'reclamo/cre', reclamo);
  }

  create(reclamo: Reclamos): Observable<Reclamos>{
    return this.http.post<Reclamos>(this.URL + 'cre', reclamo);
  }

  updateReclamos(reclamo: Reclamos, idReclamo: any): Observable<Reclamos> {
    return this.http.put<Reclamos>(this.URL + `reclamo/upd/${idReclamo}`, reclamo);
  }

  deleteReclamo(idPersona: number) {
    return this.http.delete<boolean>(this.URL + `eliminar/${idPersona}`);
  }
}
