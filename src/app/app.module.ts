import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// service compartido
import { CargarscriptsService } from './shared/services/cargarscripts.service';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { InterceptorService } from './core/interceptors/services/interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NoImageDirective } from './core/directive/no-image.directive';
import { CargarScriptsService } from './cargar-scripts.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxToastNotifierModule } from 'ngx-toast-notifier';

@NgModule({
  declarations: [
    AppComponent,
    NoImageDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added,
    BrowserAnimationsModule,NgxToastNotifierModule,
    
  ],
  providers: [
    CargarScriptsService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
