import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxToastService } from 'ngx-toast-notifier'

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(public toatrServices: ToastrService) { }


  showSuccess(text: string, tittle: string) {
    this.toatrServices.success(text, tittle, {
      timeOut: 2000,
    });
  }
  showError(text: string, tittle: string) {
    this.toatrServices.error(text, tittle, {
      timeOut: 2000,
    });
  }
  showWarnig(text: string, tittle: string) {
    this.toatrServices.warning(text, tittle);
  }
  showInfo(text: string, tittle: string) {
    this.toatrServices.info(text, tittle);
  }
}
