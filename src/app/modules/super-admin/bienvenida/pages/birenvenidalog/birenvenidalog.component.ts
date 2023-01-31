import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-birenvenidalog',
  templateUrl: './birenvenidalog.component.html',
  styleUrls: ['./birenvenidalog.component.css']
})
export class BirenvenidalogComponent {

  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  goToR($event: any): void {

    this.router.navigate(['sup-admin/menu-spradmin'])
    console.log($event)

  }

}
