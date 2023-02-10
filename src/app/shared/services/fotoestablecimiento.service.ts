// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Establecimiento } from 'src/app/core/models/establecimiento';
// import { FotoEstablecimiento } from 'src/app/core/models/fotoestablecimiento';
// import { Usuario } from 'src/app/core/models/usuario';

// @Injectable({
//   providedIn: 'root'
// })
// export class FotoEstaService {

//   private URL = "http://localhost:5000/fotoEstablecimiento/";

//   constructor(private http: HttpClient) { }

//   getFotoEstablecimiento() {
//     return this.http.get<FotoEstablecimiento[]>(this.URL + 'li');
//   }

//   postFotoEstablecimiento(fotoEstablecimiento: FotoEstablecimiento) {
//     return this.http.post<FotoEstablecimiento>(this.URL + 'cre', fotoEstablecimiento);
//   }

// }