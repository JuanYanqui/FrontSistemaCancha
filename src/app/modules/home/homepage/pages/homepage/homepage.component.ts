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
  this.lat=-2.8953331;
  this.long =-79.007535;
  this.zoom = 13;
  this.mapTypeId = 'hybrid';
  this. obtenerEstablecimiento();
}

ngOnInit(): void {
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
