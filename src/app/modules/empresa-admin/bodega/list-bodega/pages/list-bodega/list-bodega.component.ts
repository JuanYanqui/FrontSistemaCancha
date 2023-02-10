import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { finalize } from 'rxjs';
import { Bodega } from 'src/app/core/models/bodega';
import { Empresa } from 'src/app/core/models/empresa';
import { BodegasService } from 'src/app/modules/empresa-admin/services/bodegas.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-list-bodega',
  templateUrl: './list-bodega.component.html',
  styleUrls: ['./list-bodega.component.css']
})
export class ListBodegaComponent implements OnInit {
  bodegasList: Bodega[] = [];
  bodega = {} as Bodega;
  selectedId = 0;
  arraySelected: any
  loading: boolean = true;
  constructor(
    private usuariosService: UsuarioService,
    private toastr: ToastrService,
    private bodegasService: BodegasService
  ) { }

  empresa = new Empresa();

  ngOnInit(): void {
    this.obtenerEmpresa();
  }

  getBodegas() {
    this.bodegasService
      .getByEmpresa(this.empresa.idEmpresa)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (bodega) => {
          console.warn(bodega);

          this.bodegasList = bodega;
          this.loading = false;
        },
        (err) => {
          console.log(err.message);
          this.loading = false;
        }
      );
  }
  obtenerEmpresa() {
    let idUsuario = localStorage.getItem('idUsuario');
    this.usuariosService.getPorId(idUsuario).subscribe({
      next: (data) => {
        // this.empresa = data.empresa!;
      },
      error: (error) => console.log(error),
      complete: () => this.getBodegas(),
    });
  }
  editBodega(bodega: Bodega) { }

  disableBodega(bodega: any) {
    console.log(bodega);
  }

  extractData(datosTabla: any) {
    return datosTabla.map((row: any) => [row.id, row.capacidad_max, row.descripcion, row.direccion, row.inventario_disponible, row.localidad, row.nombre, row.telefono, row.tipobodega, row.estado]);
  }
  async generaraPDF() {
    if (this.arraySelected <= 0) {
      alert("Seleccione todas las bodegas para poder generara el pdf")
    } else {
      console.log(this.arraySelected)
      const pdf = new PdfMakeWrapper();
      pdf.pageOrientation('landscape')
      pdf.pageSize('A4')
      pdf.add(pdf.ln(2))
      pdf.add(new Txt("Reporte Bodega").bold().italics().alignment('center').end);
      pdf.add(pdf.ln(2))
      pdf.add(new Table([
        ['id', 'Capacidad Maxima', 'Descripción', 'Dirección', 'Inventerio disponible', 'Localidad', 'Nombre', 'Teléfono', 'Tipo Bodega', 'Estado'],
      ]).widths(['*', '*', '*', '*', '*', '*', '*', '*', '*', '*']).layout(
        {
          fillColor: (rowIndex?: number, node?: any, columnIndex?: number) => {
            return rowIndex === 0 ? '#CCCCCC' : '';
          }
        }
      ).end)
      pdf.add(new Table([
        ...this.extractData(this.arraySelected)
      ]).widths('*').end)

      pdf.create().open();
    }
  }
}
