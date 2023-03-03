import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disponibilidad } from 'src/app/core/models/disponibilidad';
import { Pago_Reserva } from 'src/app/core/models/pago_reserva';
import { Persona } from 'src/app/core/models/persona';
import { Reserva } from 'src/app/core/models/reserva';

@Injectable({
  providedIn: 'root'
})
export class Pago_ReservaServicio {

  private URL = "http://localhost:5000/pagoReserva/";

  constructor(private http: HttpClient) { }

  getDisponibilidad() {
    return this.http.get<Pago_Reserva[]>(this.URL + 'li');
  }


  postPagoreserva(Pago_Reserva: Pago_Reserva) {
    return this.http.post<Pago_Reserva>(this.URL + 'cre', Pago_Reserva);
  }
  

  deletePagoreserva(idPagoReserva: number) {
    return this.http.delete<boolean>(this.URL + `eli/${idPagoReserva}`);
  }

  getPorId(idPagoReserva: any) {
    return this.http.get<Pago_Reserva>(this.URL + idPagoReserva);
  }

  updatePagoReserva(pago_reserva: Pago_Reserva, idPagoReserva: any) {
    return this.http.put<Pago_Reserva>(this.URL + `upd/${idPagoReserva}`, pago_reserva);
  }

  Reservasporpago(idReserva: any) {
    return this.http.get<any>(this.URL+`pago/${idReserva}`);
  }

  deletePagoReserva(idPagoReserva: number) {
    return this.http.delete(this.URL+`pagos/${idPagoReserva}`);
  }

  Pagosporestablecimiento(idEstablecimiento: any) {
    return this.http.get<any>(this.URL+`pagosporestablecimiento/${idEstablecimiento}`);
  }


}