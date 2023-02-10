import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/core/enviroments/environment';
import { Categoria } from 'src/app/core/models/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private url = environment.baseUrl;
	constructor(private http: HttpClient) { }

	getCategorias(): Observable<Categoria[]>{
		return this.http.get<Categoria[]>(this.url + '/categorias')
	}
  putcategoria(categoria:Categoria, id:string):Observable<any>{
    return this.http.put(`${this.url}/categorias/categoriaupdate/${id}`,categoria);
  }
  addcategoria(categoria:Categoria):Observable<Categoria>{
    return this.http.post<any>(`${this.url}/categorias`,categoria)
  }
}
