import { Component } from '@angular/core';
import { Establecimiento } from 'src/app/core/models/establecimiento';
import { Usuario } from 'src/app/core/models/usuario';

@Component({
  selector: 'app-edit-establecimiento',
  templateUrl: './edit-establecimiento.component.html',
  styleUrls: ['./edit-establecimiento.component.css']
})
export class EditEstablecimientoComponent {
  listaUsuarios: Usuario[] = [];
  loading: boolean = true;
  establecimientos: Establecimiento[]=[];
}
