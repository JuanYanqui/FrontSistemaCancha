import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA7-wlmPnDc7_ErhX28w62wWBko0bABJpY'
    }),
  ],
  exports:[
    HomepageComponent
  ]
})
export class HomepageModule { }
