import { Component, OnInit } from '@angular/core';
import{Router } from '@angular/router';
import { EstablecimientoService } from 'src/app/shared/services/establecimiento.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent  implements OnInit{
  lat: number = 0;
  long: number= 0;
  zoom: number;
  iconUrl?: String;
 mapTypeId: string;
 firstMapShown: boolean = false;

constructor(private router : Router, private establecimientoService: EstablecimientoService){
  this.lat=-1.831239;
  this.long =-78.183406;
  this.zoom = 25;
  this.mapTypeId = 'hybrid';
  this. obtenerEstablecimiento();
}

ngOnInit(): void {
}

recargar(){
  this.router.navigate(['/register-usr'])
}

goToR($event: any) :void{
 
  this.router.navigate(['/login-usr'])
  console.log($event)

 }

 listaestablecimiento:any;
 obtenerEstablecimiento() {
  this.establecimientoService.getEstablecimiento().subscribe(
    data => {
      this.listaestablecimiento = data;
      console.log(data);
      
    }
    
  );
  this.firstMapShown = true;;
}

}
