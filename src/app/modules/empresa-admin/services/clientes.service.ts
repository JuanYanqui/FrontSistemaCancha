import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Cliente } from 'src/app/core/models/cliente'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  constructor(private http:HttpClient) { }
  private URL='http://localhost:5000/cliente';

  save(cliente:Cliente):Observable<any>{
    return this.http.post<Cliente>(`${this.URL}/`,cliente);
  }
  listar():Observable<any>{
    return this.http.get(`${this.URL}/listar`);
  }
  porId(idcliente:any):Observable<any>{
    return this.http.get<Cliente>(this.URL+'/'+idcliente);
  }
  updateclientes(clientes:Cliente, idcliente:any){
    return this.http.put<Cliente>(this.URL+`/actualizar/${idcliente}`,clientes);
  }

  getByEmpresa(idEmpresa: any){
    return this.http.get<Cliente[]>(this.URL+`/listarPorEmpresa/${idEmpresa}`);
  }

  getByEmpresaUsuario(idUsuario: any, idEmpresa: any){
    return this.http.get<Cliente>(`${this.URL}/listarPorUsuarioAndEmpresa/${idUsuario}/${idEmpresa}`)
  }

}
