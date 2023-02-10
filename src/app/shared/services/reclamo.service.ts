import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamos } from 'src/app/core/models/reclamos';
import { Usuario } from 'src/app/core/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  private URL = "http://localhost:5000/reclamos/";

  constructor(private http: HttpClient) { }

  getReclamos() {
    return this.http.get<Reclamos[]>(this.URL + 'li');
  }

  postReclamos(reclamo: Reclamos): Observable<any> {
    return this.http.post<Reclamos>(this.URL + 'cre', reclamo);
  }

  updateReclamos(reclamo: Reclamos, idAdministrador: any) {
    return this.http.put<Reclamos>(this.URL + `actualizar/${idAdministrador}`, reclamo);
  }

  deleteReclamo(idAdministrador: number) {
    return this.http.delete<boolean>(this.URL + `eliminar/${idAdministrador}`);
  }
}
