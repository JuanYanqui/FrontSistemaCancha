import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AlertsService } from 'src/app/core/alerts/services/alerts.service';
import { Bodega } from 'src/app/core/interfaces/bodega';
import { Empresa } from 'src/app/core/models/empresa';
import { PersonalCargo } from 'src/app/core/models/personal-cargo';
import { PersonalCargoService } from 'src/app/modules/empresa-admin/services/personal-cargo.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { BodegasService } from '../../../bodegas.service';

@Component({
  selector: 'app-edit-bodega',
  templateUrl: './edit-bodega.component.html',
  styleUrls: ['./edit-bodega.component.css']
})
export class EditBodegaComponent implements OnInit{
  constructor (
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private bodegaService: BodegasService, private usuarioService: UsuarioService,
    private alertService: AlertsService, private personalCargoService: PersonalCargoService,
  ) {}

  bodegaForm!: UntypedFormGroup;
  validPattern = '^(?! )^[A-Za-z0-9 ]+$';
  validNumberPatern = '^[0-9]+([.|,][0-9]+)?$';
  bodega = {} as Bodega;
  bodega$!: Observable<Bodega>;
  loading = false;
  id = 0;
  empresa = new Empresa();
  currentPersonal = new PersonalCargo();
  personal: PersonalCargo[] = [];

  bodegero = new PersonalCargo();
  bodegeros: PersonalCargo[] = [];

  updateBodega() {
    if (this.bodegaForm.valid) {
      this.bodega = this.bodegaForm.value;
      this.bodega.inventario_disponible = 0;
      this.bodega.estado = this.bodegaForm.value.estado;
      this.bodega.personalCargos = [this.bodegero];
      this.bodega.empresa = this.empresa;

      this.bodegaService
        .updateBodega(this.bodega, this.id.toString())
        .subscribe(
          (response) => {
            this.bodegaForm.reset();
            this.alertService.showSuccess(
              'Bodega registrada correctamente',
              'Bodegas'
            );
            this.loadFormGroup();
            this.updateForms();
            this.loading = false;
          },
          (error) => {
            this.alertService.showError(error.message, 'Error registro');
            this.loading = false;
          }
        );
    } else {
      console.log('No está validado');
    }
  }
  get f() {
    return this.bodegaForm.controls;
  }

  getById() {
    this.bodega$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.bodegaService.getBodegaById(params.get('id')!)
      )
    );
  }

  obtenerEmpresa() {
    let idUsuario = localStorage.getItem('idUsuario');
    this.usuarioService.getPorId(idUsuario).subscribe({
      // next: (data) => (this.empresa = data.empresa!),
      // complete: () => this.getPersonal(),
    });
  }

  getIndexPersonal() {
    var per = new PersonalCargo;
    this.personal.forEach((element) => {
      if (element.personal?.usuario?.persona?.nombre === this.currentPersonal.personal?.usuario?.persona?.nombre) {
        per = element;
      }
    });
    this.bodegaForm.patchValue({ personalCargos: this.personal.indexOf(per) });
  }

   getPersonal() {
    this.personalCargoService
      .getByEmpresaCargo(this.empresa.idEmpresa, 'Bodega')
      .subscribe({
        next: (bodegero) => {
          this.personal = bodegero;
        },
        complete: () => {
          this.getIndexPersonal()
        }
      });
  }

  selectBodegero(event: any) {
    this.bodegero = this.personal[event.target.value];
  }

  async updateForms() {
    await this.bodega$.subscribe({
      next: (data) => {
        console.warn(data);

        this.id = data.id;
        this.bodegaForm.patchValue({
          nombre: data.nombre, direccion: data.direccion, localidad: data.localidad, telefono: data.telefono, tipobodega: data.tipobodega, capacidad_max: data.capacidad_max, descripcion: data.descripcion, estado: data.estado
        });
        this.currentPersonal = data.personalCargos[0];
        this.bodegero = data.personalCargos[0];
      }
    });
  }

  loadFormGroup() {
    this.bodegaForm = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern(this.validPattern)],
      ],
      direccion: ['', Validators.required],
      localidad: ['', Validators.required],
      telefono: [
        '',
        [Validators.required, Validators.pattern(this.validNumberPatern)],
      ],
      personalCargos: ['', Validators.required],
      tipobodega: ['', Validators.required],
      capacidad_max: [
        '',
        [Validators.required, Validators.pattern(this.validNumberPatern)],
      ],
      descripcion: ['', !Validators.required],
      estado: ['', !Validators.required],
    });
  }
  countries: any[] = [];
  selectedCity1: any;
   ngOnInit(): void {
    this.obtenerEmpresa();
    this.loadFormGroup();
     this.getById();
     this.updateForms();
    this.countries = [{
      "provincia": "AZUAY",
      "cantones": [{ "canton": "CUENCA" },
      { "canton": "GIRÓN" },
      { "canton": "GUALACEO" },
      { "canton": "NABÓN" },
      { "canton": "PAUTE" },
      { "canton": "PUCARA" },
      { "canton": "SAN FERNANDO" },
      { "canton": "SANTA ISABEL" },
      { "canton": "SIGSIG" },
      { "canton": "OÑA" },
      { "canton": "CHORDELEG" },
      { "canton": "EL PAN" },
      { "canton": "SEVILLA DE ORO" },
      { "canton": "GUACHAPALA" },
      { "canton": "CAMILO PONCE ENRÍQUEZ" }
      ]
    }];

  }
}
