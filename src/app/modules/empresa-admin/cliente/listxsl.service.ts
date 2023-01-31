import { Injectable } from '@angular/core';


import * as XLSX from 'xlsx';
import  * as FileSarver from 'file-saver'
const EXCEL_TYPE = 
'application/vnd.openxmlformats-officedocument.spreadsheetml.seeht; charset=UTF-8';
const EXCEL_EXT = '.xlsx'


@Injectable({
  providedIn: 'root'
})
export class ListxslService {

  constructor() { }


exportToexcel(json:any[], excelfilename:string):void{
  const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook : XLSX.WorkBook = {
    Sheets: {'data': worksheet},
    SheetNames:['data']
  };
const excelBuffer: any = XLSX.write(workbook, {bookType:'xlsx',type:'array'});
// llamamos al metodo el que guardara nuestro ficherio

}
private saveAdExcel(buffer:any , filename:string):void{
  const data : Blob = new Blob([buffer],{type:EXCEL_TYPE});
  FileSarver.saveAs(data,filename+'_export_'+ new Date().getTime()+EXCEL_TYPE);
}


}
