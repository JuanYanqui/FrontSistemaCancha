import { Component, Input } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertsService } from 'src/app/core/alerts/services/alerts.service';
import { Producto } from 'src/app/core/interfaces/producto';
import { Categoria } from 'src/app/core/models/categoria';
import { Empresa } from 'src/app/core/models/empresa';
import { Proveedor } from 'src/app/core/models/proveedor';
import { ProveedorService } from 'src/app/modules/empresa-admin/services/proveedor.service';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { SharedServices } from 'src/app/shared/services/shared.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { CategoriaService } from '../../../services/categoria.service';
@Component({
  selector: 'app-detailprod',
  templateUrl: './detailprod.component.html',
  styleUrls: ['./detailprod.component.css']
})
export class DetailprodComponent {
  @Input() member: any = '';
  constructor (
    private route: ActivatedRoute, private formbuilder2: UntypedFormBuilder,
    private formbuilder3: UntypedFormBuilder,
    private proveedorService: ProveedorService, private sharedServices: SharedServices,
    private productoserv: ProductosService,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService,
    private formBuilder: UntypedFormBuilder,
    private alertService: AlertsService, private alert: AlertsService
  ) {}

  producto$!: Observable<Producto>;
  proveedores: Proveedor[] = [];
  categorias: Categoria[] = [];

  numbersPattern = '^[0-9]+([.][0-9]+)?$';
  alphanumericPattern = '^(?! )^[A-Za-z0-9 ]+$';
  lettersPattern = '^(?! )^[A-Za-z ]+$';

  up_categorias: Categoria[] = [];
  up_proveedores: Proveedor[] = [];

  unidades_medida = Array<any>();
  precio_ventas = Array<any>();

  proveedor = new Proveedor();
  categoria = {} as Categoria;

  producto = {} as Producto;
  productoForm!: UntypedFormGroup;

  empresa = new Empresa();
  current_categoria = new Categoria();
  current_proveedor = new Proveedor();

  loading: boolean = false;
  file: any = '';
  image!: any;
  id: any;
  imglink = '';

  //*  variables para unidades y precios
  btnAddunidades = false;
  public data: any;
  current_equivalencia!: string;
  btnAddPrecios_ventas = false;
  current_equivalencias = '';
  unidadesForm!: UntypedFormGroup;
  priceForm!: UntypedFormGroup;
  listpreciosventa = Array<any>();
  listUnidadesMedidaProducto = Array<any>();
  showMe: boolean = true;
  selectedPrice: any = [];
  selectedUnidad: any = [];

  get formValues() {
    return this.productoForm.controls;
  }

  imageSelected(event: any): void {
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (f) => {
      this.file = reader.result;
    };
  }

  selectProveedor(event: any) {
    const index = this.up_proveedores.indexOf(this.proveedores[event.target.value]);
    this.proveedor = this.proveedores[event.target.value];
    if (index < 0) this.up_proveedores.push(this.proveedor);
  }

  selectCategoria(event: any) {
    const index = this.up_categorias.indexOf(this.categorias[event.target.value]);
    this.categoria = this.categorias[event.target.value];
    if (index < 0) this.up_categorias.push(this.categoria);
  }

  delete(index: any, tipo: string) {
    if (index !== -1) {
      if (tipo == 'p') {
        this.up_proveedores.splice(index, 1);
        this.productoForm.patchValue({ proveedores: this.proveedores.indexOf(this.up_proveedores[this.up_proveedores.length - 1]) });
      } else {
        this.up_categorias.splice(index, 1);
        this.productoForm.patchValue({ categorias: this.categorias.indexOf(this.up_categorias[this.up_categorias.length - 1]) });
      }
    }

    if (this.up_proveedores.length === 0) {
      this.productoForm.patchValue({ proveedores: '' });
    }
    if (this.up_categorias.length === 0) {
      this.productoForm.patchValue({ categorias: '' });
    }
  }

  restValues() {
    this.getById();
  }

  patchForms(producto: Producto) {

    this.productoForm.patchValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      comentario: producto.comentario,
      peso: producto.peso,
      codigo: producto.codigo,
      oferta_descuento: producto.oferta_descuento,
      precio_compra: producto.precio_compra,
      precio_venta: producto.precio_venta,
      estado: producto.estado,
    });
    this.imglink = producto.imagen;
    this.current_categoria = producto.categorias[producto.categorias.length - 1];
    this.current_proveedor = producto.proveedores[producto.proveedores.length - 1];

    this.populateCategoria(producto.categorias);
    this.populateProveedor(producto.proveedores);
    this.getIndexCategoria();
    this.getIndexProveedor();
  }

  loadForm() {
    this.productoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(this.alphanumericPattern), Validators.maxLength(50)]],
      codigo: ['', [Validators.required, Validators.maxLength(25)]],
      descripcion: ['', Validators.required],
      comentario: [''],
      peso: ['', [Validators.required, Validators.pattern(this.numbersPattern), Validators.maxLength(6)]],
      oferta_descuento: ['', [Validators.pattern(this.numbersPattern), Validators.maxLength(3)]],
      precio_compra: ['', [Validators.required, Validators.pattern(this.numbersPattern), Validators.maxLength(4)]],
      precio_venta: ['', [Validators.required, Validators.pattern(this.numbersPattern), Validators.maxLength(4)]],
      categorias: ['', Validators.required],
      proveedores: ['', Validators.required],
      imagen: ['', !Validators.required],
      estado: true,
    });

    this.priceForm = this.formbuilder2.group({
      pricesDetails: this.formbuilder2.array([]),
    });

    this.unidadesForm = this.formbuilder3.group({
      unidadesDetails: this.formbuilder3.array([]),
    });
  }

  getIndexProveedor() {
    var prov = new Proveedor();
    this.proveedores.forEach((element) => {
      if (element.idProveedor === this.current_proveedor.idProveedor) {
        prov = element;
      }
    });
    this.productoForm.patchValue({ proveedores: this.proveedores.indexOf(prov) });
  }

  getIndexCategoria() {
    var cat = new Categoria();
    this.categorias.forEach((element) => {
      if (element.id === this.current_categoria.id) {
        cat = element;
      }
    });
    this.productoForm.patchValue({ categorias: this.categorias.indexOf(cat) });
  }

  updateproducto() {

    console.log('Falta validar?', this.productoForm.value);
    console.warn('Datos del producto a guardar', this.productoForm.value);

    if (this.productoForm.valid) {

      this.loading = true;
      this.priceForm
        .get('pricesDetails')
        ?.value.map((obj: any) => this.listpreciosventa.push(obj));

      this.unidadesForm
        .get('unidadesDetails')
        ?.value.map((obj: any) => this.listUnidadesMedidaProducto.push(obj));

      this.producto = this.productoForm.value;
      this.producto.estado = this.productoForm.value.estado;
      this.producto.precio_ventas = this.listpreciosventa;
      this.producto.unidades_medida = this.listUnidadesMedidaProducto;
      this.producto.proveedores = this.up_proveedores;
      this.producto.categorias = this.up_categorias;
      this.producto.empresa = this.empresa;
      if (this.productoForm.value.imagen === '') {
        this.producto.imagen = this.imglink;
        this.sendProduct()
      }

      else {
        this.alert.showInfo('Subiendo imagen', 'AWS');
        this.sharedServices.addimage(this.image, 'productos').subscribe({
          next: (img: string) => (
            this.producto.imagen = img
          ),
          complete: () => {
            this.alert.showSuccess('Imagen subida', 'AWS');

            this.sendProduct();
          },
          error: (error) => {
            this.loading = false;
            this.alert.showError(error.message, 'AWS');
          },
        });
      }

    } else {
      console.log('No está validado');
    }
  }

  sendProduct() {
    this.alert.showInfo('Actualizando producto', 'Producto');
    this.productoserv.updateProduct(this.producto, this.id.toString()).subscribe({
      next: (response) =>

        console.log(response),
      complete: () => {
        this.loading = false;
        this.resetRegistro();
        // window.location.reload();
        this.alert.showSuccess('Producto actualizado correctamente', 'Actualizar');
      },
      error: (error: any) => {
        this.alert.showError(error.message, 'Error registro');
        this.loading = false;
      },
    });
  }

  values = [];

  private populateData() {
    this.values.forEach((data, index) => {
      this.onAdad();
      this.pricesDetails.controls[index].setValue(data);
    });
  }

  resetRegistro() {
    this.loadForm();
    this.loadProduct()
    // this.priceForm = this.formbuilder2.group({
    //   pricesDetails: this.formbuilder2.array([]),
    // });
    // this.unidadesForm = this.formbuilder3.group({
    //   unidadesDetails: this.formbuilder3.array([]),
    // });
    // this.populateData();
    // this.showMe = false;
    // this.up_categorias = [];
    // this.up_proveedores = [];
    // this.file = null;
  }
  get f() {
    return this.productoForm.controls;
  }

  getById() {
    this.producto$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productoserv.getProductById((this.id = params.get('id')!))
      )
    );
  }

  populateProveedor(proveedor: Proveedor[]) {
    proveedor.forEach((element, index) => {
      const i = this.up_proveedores.indexOf(this.proveedores[index]);
      this.proveedor = this.proveedores[index];
      if (i < 0) this.up_proveedores.push(this.proveedor);
    });
  }

  populateCategoria(categoria: Categoria[]) {
    categoria.forEach((element, index) => {
      var i = this.up_categorias.indexOf(this.categorias[index]);
      this.categoria = this.categorias[index];
      if (i < 0) this.up_categorias.push(this.categoria);
    });
  }

  async loadProduct() {
    await this.producto$.subscribe({
      next: (p) => {
        console.warn(p);

        p.precio_ventas.forEach((data, index) => {
          this.pricesDetails.push(this.addControls());
          this.pricesDetails.controls[index].setValue(data);
          this.priceForm.markAllAsTouched();
          this.btnAddPrecios_ventas = false;
        });
        p.unidades_medida.forEach((data, index) => {

          this.unidadesDetails.push(this.addControlsUnidades());
          this.unidadesDetails.controls[index].setValue(data);
          this.unidadesForm.markAllAsTouched();
          this.btnAddunidades = false;
        });
        this.patchForms(p);
      },
    });
  }

  obtenerEmpresa() {
    let idUsuario = localStorage.getItem('idUsuario');
    this.usuarioService.getPorId(idUsuario).subscribe({
      next: (data) => {
        // this.empresa = data.empresa!
      }, complete: () => {
        this.loadProveedores();
        this.loadCategorias();
      }, error: (error) => console.log(error)
    });

  }

  loadCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (categoria) => {
        this.categorias = categoria;
      }, complete: () => {
        this.loadProduct();

      },
      error: () => console.log("No se pudo optener los proveedores")
    })
  }

  loadProveedores() {
    this.proveedorService
      .getByEmpresa(this.empresa.idEmpresa)
      .subscribe({
        next: (proveedores) => this.proveedores = proveedores,
        error: () => console.log("No se pudo optener los proveedores")
      })
  }

  //! ngOnInit//////////////////////////////////////////
  ngOnInit(): void {
    this.obtenerEmpresa();
    this.loadForm();
    this.getById();

  }

  //!/ngoninit//////////////////////////////////////////
  //* Agregar precios de venta /////////////////////////
  get pricesDetails(): any {
    return this.priceForm.get('pricesDetails') as UntypedFormArray;
  }

  onAdad() {
    this.priceForm.valueChanges.subscribe(() => {
      this.btnAddPrecios_ventas = this.priceForm.invalid;
    });
    if (!this.btnAddPrecios_ventas) {
      this.btnAddPrecios_ventas = true;
      this.pricesDetails.push(this.addControls());
    }
  }

  onDelete(index: any) {
    this.btnAddPrecios_ventas = false;
    if (index.length < 1) {
      return;
    }
    this.pricesDetails.controls.splice(index - 1, 1);
  }

  onSubmit() {
    this.data = JSON.stringify(this.pricesDetails.value);
  }

  priceDetailsControls(index: number) {
    return this.pricesDetails.controls[index]['controls'];
  }

  public addControls() {
    return new UntypedFormGroup({
      precio: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(this.lettersPattern),
      ]),
      valor: new UntypedFormControl('', [
        Validators.pattern(this.numbersPattern),
        Validators.required,
      ]),
    });
  }
  cambio(a: any) {
    this.btnAddPrecios_ventas = false;
    this.priceForm = this.formbuilder2.group({
      pricesDetails: this.formbuilder2.array([]),
    });
  }

  //? Agregar unidades con equivalencias////////////////

  get unidadesDetails(): any {
    return this.unidadesForm.get('unidadesDetails') as UntypedFormArray;
  }

  onAdad2() {

    this.unidadesForm.valueChanges.subscribe(() => {
      this.btnAddunidades = this.unidadesForm.invalid;
    });

    if (
      this.unidadesForm.get('unidadesDetails')?.valid &&
      this.productoForm.get('precio_compra')?.valid &&
      !this.btnAddunidades
    ) {
      this.btnAddunidades = false;
      this.unidadesDetails.push(this.addControlsUnidades());
    }
  }

  onDelete2(index: any) {
    if (this.unidadesDetails.controls.length < 2) {
      this.btnAddunidades = false;
      this.unidadesForm = this.formbuilder3.group({
        unidadesDetails: this.formbuilder3.array([]),
      });
      return;
    }
    if (this.unidadesForm.get('unidadesDetails')?.value[index]?.nombre) {
      if (this.unidadesForm.get('unidadesDetails')?.value[index - 1]?.nombre) {
        if (
          this.unidadesForm.get('unidadesDetails')?.value[index - 1]
            ?.equivalencia !=
          this.unidadesForm.get('unidadesDetails')?.value[index - 2]?.nombre
        ) {
          this.unidadesDetails.controls[index].patchValue({
            equivalencia:
              this.unidadesForm.get('unidadesDetails')?.value[index - 1]
                ?.nombre,
          });
        } else {
          if (
            this.unidadesForm.get('unidadesDetails')?.value[index + 1]?.nombre
          ) {
            this.unidadesDetails.controls[index].patchValue({
              equivalencia:
                this.unidadesForm.get('unidadesDetails')?.value[index - 2]
                  ?.nombre,
            });
          } else {
            if (
              this.unidadesForm.get('unidadesDetails')?.value[index + 1]?.nombre
            ) {
              this.unidadesDetails.controls[index].patchValue({
                equivalencia:
                  this.unidadesForm.get('unidadesDetails')?.value[index - 2]
                    ?.nombre,
              });
            }
          }
          this.current_equivalencia =
            this.unidadesForm.get('unidadesDetails')?.value[index - 1]?.nombre;
        }
      }
    } else {
      this.current_equivalencias = 'd';
    }
    this.current_equivalencia = '';

    this.unidadesDetails.controls.splice(index - 1, 1);

  }

  unidadDetailsControls(index: number) {
    return this.unidadesDetails.controls[index]['controls'];
  }

  public addControlsUnidades() {
    this.btnAddunidades = true;

    if (!this.unidadesForm.get('unidadesDetails')?.value[0]?.nombre) {
      this.current_equivalencia = 'Unidad';
    } else {
      if (this.current_equivalencias == 'd') {
        console.log("Rrr")
        this.current_equivalencia =
          this.unidadesForm.get('unidadesDetails')?.value[
            this.unidadesForm.get('unidadesDetails')?.value.length - 1
          ]?.nombre;
      } else {
        if (this.current_equivalencia == '') {
          console.log("Este es")
          this.current_equivalencia =
            this.unidadesForm.get('unidadesDetails')?.value[
              this.unidadesForm.get('unidadesDetails')?.value.length - 1
            ]?.nombre;
        } else {
          console.log("Este")
          this.current_equivalencia =
            this.unidadesForm.get('unidadesDetails')?.value[
              this.unidadesForm.get('unidadesDetails')?.value.length - 1
            ]?.nombre;
        }
      }

    }

    return new UntypedFormGroup({
      nombre: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(this.alphanumericPattern),
      ]),
      equivalencia: new UntypedFormControl(this.current_equivalencia, [
        Validators.pattern(this.alphanumericPattern),
        Validators.required,
      ]),
      valor_equivalencia: new UntypedFormControl('', [
        Validators.pattern(this.numbersPattern),
        Validators.required,
      ]),
    });
  }
}
