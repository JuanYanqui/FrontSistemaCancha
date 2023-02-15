import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Console } from 'console';
import { Cancha } from 'src/app/core/models/cancha';

@Injectable({
  providedIn: 'root'
})
export class CanchasService {

  private URL = "http://localhost:5000/cancha/";

  constructor(private http: HttpClient) { }

  getCanchas() {
    return this.http.get<Cancha[]>(this.URL + 'li');
  }

  existCanchas(idCancha: number) {
    return this.http.get<boolean>(this.URL + `exis/${idCancha}`);
  }

  postCanchas(cancha: Cancha) {
    console.log(cancha);
    console.log("ssssssssssssssss");
    return this.http.post<Cancha>(this.URL + 'cre', cancha);
  }

  putCanchas(cancha: Cancha, idCancha: any) {
    return this.http.put<Cancha>(this.URL + `upd/${idCancha}`, cancha);
  }

  deleteCanchas(idCancha: number) {
    return this.http.delete(this.URL + `eli/${idCancha}`);
  }
}
