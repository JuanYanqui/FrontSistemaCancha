import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  ngOnInit(): void {
    
  }
  constructor(private router:Router){

  }
  goToR($event: any) :void{
 
    this.router.navigate([''])
    console.log($event)
  
   }
   goTo($event: any) :void{
 
    this.router.navigate(['/login-usr'])
    console.log($event)
  
   }
   goT($event: any) :void{
 
    this.router.navigate(['/register-usr'])
    console.log($event)
  
   }
  
}
