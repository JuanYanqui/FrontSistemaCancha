import { NgxToastService } from 'ngx-toast-notifier';


export class Notificaciones {
  constructor(private ngxToastService: NgxToastService) {}

  addSuccess():void{
    this.ngxToastService.onSuccess('This is a success alert','This is a success alert')
  }

  addInfo():void{
    this.ngxToastService.onInfo('This is a info alert','This is a info alert')
  }

  addWarning():void{
    this.ngxToastService.onWarning('This is a warning alert','This is a warning alert')
  }

  addDanger():void{
    this.ngxToastService.onDanger('This is a danger alert','This is a danger alert')
  }
}