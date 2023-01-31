import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/core/models/empresa';
import { Persona } from 'src/app/core/models/persona';
import { Roles } from 'src/app/core/models/roles';
import { Usuario } from 'src/app/core/models/usuario';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { SharedServices } from 'src/app/shared/services/shared.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.component.html',
  styleUrls: ['./edit-empresa.component.css']
})
export class EditEmpresaComponent {

  empresa: Empresa = new Empresa;
  persona: Persona = new Persona;
  usuario: Usuario = new Usuario;

  rol: Roles = new Roles;

  listaEmpresas: Empresa[] = [];

  loading: boolean = true;

  displayEE: boolean = false;

  genero: any;
  provincia: any;
  ciudad: any;

  file: any = '';

  files: any = [];
  image!: any;

  actualizaImagen: boolean = false;

  cuentaBancaria: string = '';
  banco: string = '';
  tipo: string = '';
  numero: string = '';

  cuentas: string[] = [];

  verfCorreo: string = '';

  selectedCountry: String = "ChooseCountry";

  Countries: Array<any> = [
    {
      name: 'Azuay',
      states: [{ name: 'Camilo Ponce Enríquez' }, { name: 'Chordeleg' }, { name: 'Cuenca' }, { name: 'El Pan' }, { name: 'Girón' }, { name: 'Guachapala' }, { name: 'Gualaceo' }, { name: 'Nabón' }, { name: 'Oña' }, { name: 'Paute' }, { name: 'Pucará' }, { name: 'San Fernando' }, { name: 'Santa Isabel' }, { name: 'Sevilla de Oro' }, { name: 'Sígsig' },]
    },
    {
      name: 'Bolivar',
      states: [{ name: 'Caluma' }, { name: 'Chillanes' }, { name: 'Chimbo' }, { name: 'Echeandía' }, { name: 'Guaranda' }, { name: 'Las Naves' }, { name: 'San Miguel' },]
    },
    {
      name: 'Cañar',
      states: [{ name: 'Azogues' }, { name: 'Biblían' }, { name: 'Cañar' }, { name: 'Déleg' }, { name: 'El Tambo' }, { name: 'La Troncal' }, { name: 'Suscal' },]
    },
    {
      name: 'Carchi',
      states: [{ name: 'Bolívar' }, { name: 'Espejo' }, { name: 'Huaca' }, { name: 'Mira' }, { name: 'Montúfar' }, { name: 'Tulcán' },]
    },
    {
      name: 'Chimborazo',
      states: [{ name: 'Alausí' }, { name: 'Chambo' }, { name: 'Chunchi' }, { name: 'Colta' }, { name: 'Cumandá' }, { name: 'Guámote' }, { name: 'Guano' }, { name: 'Pallatanga' }, { name: 'Penipe' }, { name: 'Riobamba' },]
    },
    {
      name: 'Cotopaxi',
      states: [{ name: 'La Maná' }, { name: 'Latacunga' }, { name: 'Pangua' }, { name: 'Pujilí' }, { name: 'Salcedo' }, { name: 'Saquisilí' }, { name: 'Sigchos' },]
    },
    {
      name: 'El Oro',
      states: [{ name: 'Arenillas' }, { name: 'Atahualpa' }, { name: 'Balsas' }, { name: 'Chilla' }, { name: 'El Guabo' }, { name: 'Huaquillas' }, { name: 'Las Lajas' }, { name: 'Machala' }, { name: 'Marcabelí' }, { name: 'Pasaje' }, { name: 'Piñas' }, { name: 'Portovelo' }, { name: 'Santa Rosa' }, { name: 'Zaruma' },]
    },
    {
      name: 'Esmeraldas',
      states: [{ name: 'Atacames' }, { name: 'Eloy Alfaro' }, { name: 'Esmeraldas' }, { name: 'Muisne' }, { name: 'Quinindé' }, { name: 'Rioverde' }, { name: 'San Lorenzo' },]
    },
    {
      name: 'Exterior',
      states: [{ name: 'Sin Especificar' },]
    },
    {
      name: 'Galapagos',
      states: [{ name: 'Isabela' }, { name: 'San Cristobal' }, { name: 'Santa Cruz' },]
    },
    {
      name: 'Guayas',
      states: [{ name: 'Balao' }, { name: 'Balzar' }, { name: 'Bucay' }, { name: 'Colimes' }, { name: 'Daule' }, { name: 'Duran' }, { name: 'El Empalme' }, { name: 'El Triunfo' }, { name: 'Guayaquil' }, { name: 'Isidro Ayora' }, { name: 'Jujan' }, { name: 'Lomas de Sargentillo' }, { name: 'Marcelino Maridueña' }, { name: 'Milagro' }, { name: 'Naranjal' }, { name: 'Naranjito' }, { name: 'Nobol' }, { name: 'Palestina' }, { name: 'Pedro Carbo' }, { name: 'Playas' }, { name: 'Salitre' }, { name: 'Samborondon' }, { name: 'Santa Lucia' }, { name: 'Simon Bolivar' }, { name: 'Yaguachi' },]
    },
    {
      name: 'Imbabura',
      states: [{ name: 'Antonio Ante' }, { name: 'Cotacachi' }, { name: 'Ibarra' }, { name: 'Otavalo' }, { name: 'Pimampiro' }, { name: 'San Miguel de Urcuquí' },]
    },
    {
      name: 'Loja',
      states: [{ name: 'Alamor' }, { name: 'Calvas' }, { name: 'Catamayo' }, { name: 'Celica' }, { name: 'Chaguarpamba' }, { name: 'Espíndola' }, { name: 'Gonzanamá' }, { name: 'Loja' }, { name: 'Macará' }, { name: 'Olmedo' }, { name: 'Paltas' }, { name: 'Pindal' }, { name: 'Puyango' }, { name: 'Quilanga' }, { name: 'Saraguro' }, { name: 'Sozoranga' }, { name: 'Zapotillo' },]
    },
    {
      name: 'Los Rios',
      states: [{ name: 'Baba' }, { name: 'Babahoyo' }, { name: 'Buena Fe' }, { name: 'Mocache' }, { name: 'Montalvo' }, { name: 'Palenque' }, { name: 'Pueblo Viejo' }, { name: 'Quevedo' }, { name: 'Quinsaloma' }, { name: 'Urdaneta' }, { name: 'Valencia' }, { name: 'Ventanas' }, { name: 'Vinces' },]
    },
    {
      name: 'Manabi',
      states: [{ name: '24 de Mayo' }, { name: 'Bolivar' }, { name: 'Calceta' }, { name: 'Chone' }, { name: 'El Carmen' }, { name: 'Flavio Alfaro' }, { name: 'Jama' }, { name: 'Jaramijó' }, { name: 'Jipijapa' }, { name: 'Junín' }, { name: 'Manta' }, { name: 'Montecristi' }, { name: 'Olmedo' }, { name: 'Pajan' }, { name: 'Pedernales' }, { name: 'Pichincha' }, { name: 'Portoviejo' }, { name: 'Puerto López' }, { name: 'Rocafuerte' }, { name: 'San Vicente' }, { name: 'Santa Ana' }, { name: 'Sucre' }, { name: 'Tosagua' },]
    },
    {
      name: 'Morona Santiago',
      states: [{ name: 'Gualaquiza' }, { name: 'Huamboya' }, { name: 'Limón Indanza' }, { name: 'Logroño' }, { name: 'Morona' }, { name: 'Pablo Sexto' }, { name: 'Palora' }, { name: 'San Juan Bosco' }, { name: 'Santiago de Méndez' }, { name: 'Sucúa' }, { name: 'Taisha' }, { name: 'Tiwintza' },]
    },
    {
      name: 'Napo',
      states: [{ name: 'Archidona' }, { name: 'Carlos Julio Arosemena Tola' }, { name: 'El Chaco' }, { name: 'Quijos' }, { name: 'Tena' },]
    },
    {
      name: 'Orellana',
      states: [{ name: 'Aguarico' }, { name: 'Francisco de Orellana' }, { name: 'La Joya de los Sachas' }, { name: 'Loreto' },]
    },
    {
      name: 'Pastaza',
      states: [{ name: 'Arajuno' }, { name: 'Mera' }, { name: 'Pastaza' }, { name: 'Santa Clara' },]
    },
    {
      name: 'Pichincha',
      states: [{ name: 'Cayambe' }, { name: 'Mejía' }, { name: 'Pedro Moncayo' }, { name: 'Pedro Vicente Maldonado' }, { name: 'Puerto Quito' }, { name: 'Quito' }, { name: 'Rumiñahui' }, { name: 'San Miguel de los Bancos' },]
    },
    {
      name: 'Santa Elena',
      states: [{ name: 'La Libertad' }, { name: 'Salinas' }, { name: 'Santa Elena' },]
    },
    {
      name: 'Santo Domingo',
      states: [{ name: 'La Concordia' }, { name: 'Santo Domingo' },]
    },
    {
      name: 'Sin Especificar',
      states: [{ name: 'Sin Especificar' },]
    },
    {
      name: 'Sucumbios',
      states: [{ name: 'Cascales' }, { name: 'Cuyabeno' }, { name: 'Gonzalo Pizarro' }, { name: 'Lago Agrio' }, { name: 'Putumayo' }, { name: 'Shushufindi' }, { name: 'Sucumbíos' },]
    },
    {
      name: 'Tungurahua',
      states: [{ name: 'Ambato' }, { name: 'Baños' }, { name: 'Cevallos' }, { name: 'Mocha' }, { name: 'Patate' }, { name: 'Pelileo' }, { name: 'Quero' }, { name: 'Santiago de Píllaro' }, { name: 'Tisaleo' },]
    },
    {
      name: 'Zamora Chinchipe',
      states: [{ name: 'Centinela del Cóndor' }, { name: 'Chinchipe' }, { name: 'El Pangui' }, { name: 'Nangaritza' }, { name: 'Palanda' }, { name: 'Paquisha' }, { name: 'Yacuambi' }, { name: 'Yantzaza' }, { name: 'Zamora' },]
    },
  ];

  states: Array<any> = [];
  cities: Array<any> = [];

  generos: any[] = [
    { gen: 'Masculino' }, { gen: 'Femenino' }, { gen: 'Otro' }
  ];

  blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  expCorreo: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  valCorreo: boolean = true;

  icnActivo: String = "pi pi-check";
  icnInactivo: String = "pi pi-times";

  constructor(private sharedServices: SharedServices, private toastr: ToastrService, private empresaService: EmpresaService, private personaService: PersonaService, private usuarioService: UsuarioService, private rolService: RolesService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerEmpresas();
  
  }

  obtenerEmpresas() {
    this.empresaService.getEmpresas().subscribe(
      data => {
        this.listaEmpresas = data.map(
          result => {
            let empresa = new Empresa;
            empresa.acronimo = result.acronimo;
            empresa.celular = result.celular;
            empresa.codigoPostal = result.codigoPostal;
            empresa.correo = result.correo;
            empresa.cuentasBancarias = result.cuentasBancarias;
            empresa.direccion = result.direccion;
            empresa.estado = result.estado;
            empresa.idEmpresa = result.idEmpresa;
            empresa.logo = result.logo;
            empresa.mision = result.mision;
            empresa.nombre = result.nombre;
            empresa.paginaWeb = result.paginaWeb;
            empresa.pais = result.pais;
            empresa.persona = result.persona;
            empresa.provincia = result.provincia;
            empresa.ciudad = result.ciudad;
            empresa.rolComercial = result.rolComercial;
            empresa.ruc = result.ruc;
            empresa.telefono = result.telefono;
            empresa.vision = result.vision;

            return empresa;
          }
        );
        this.loading = false;
        this.changeCountry(this.empresa.provincia);
      }
    )
  }

  validarCorreo() {
    this.valCorreo = this.expCorreo.test(this.empresa.correo!);
    if (this.valCorreo) {
      this.verfCorreo = '';
      console.log("Correo Bueno");
    } else {
      this.verfCorreo = 'ng-invalid ng-dirty';
      console.log("Correo malo");
    }
  }

  selected = new FormControl(3);

  agregarCuentaBancaria() {
    if (this.banco != '' && this.tipo != '' && this.numero != '') {
      this.cuentaBancaria = 'BANCO/COOPERATIVA: ' + this.banco + ' TIPO DE CUENTA: ' + this.tipo + ' NÚMERO: ' + this.numero;
      this.empresa.cuentasBancarias.push(this.cuentaBancaria);
      this.banco = '';
      this.tipo = '';
      this.numero = '';
    } else {
      this.toastr.warning('Rellene todos los campos de cuenta bancaria', 'Aviso!')
    }

  }

  quitarCuentaBancaria(i: any) {

    delete this.empresa.cuentasBancarias[i];

    for (let index = 0; index < this.empresa.cuentasBancarias.length; index++) {
      if (this.empresa.cuentasBancarias[index] != null || this.empresa.cuentasBancarias[index] === '') {
        this.cuentas.push(this.empresa.cuentasBancarias[index]);
      }
    }

    this.empresa.cuentasBancarias = this.cuentas;
  }

  editarEmpresa(empresa: Empresa) {
    this.displayEE = true;

    this.empresa.acronimo = empresa.acronimo;
    this.empresa.celular = empresa.celular;
    this.empresa.ciudad = empresa.ciudad;
    this.empresa.codigoPostal = empresa.codigoPostal;
    this.empresa.correo = empresa.correo;
    this.empresa.cuentasBancarias = empresa.cuentasBancarias;
    this.empresa.direccion = empresa.direccion;
    this.empresa.estado = empresa.estado;
    this.empresa.idEmpresa = empresa.idEmpresa;
    this.empresa.logo = empresa.logo;
    this.empresa.mision = empresa.mision;
    this.empresa.nombre = empresa.nombre;
    this.empresa.paginaWeb = empresa.paginaWeb;
    this.empresa.pais = empresa.pais;
    this.empresa.persona = empresa.persona;
    this.empresa.provincia = empresa.provincia;
    this.empresa.rolComercial = empresa.rolComercial;
    this.empresa.ruc = empresa.ruc;
    this.empresa.telefono = empresa.telefono;
    this.empresa.vision = empresa.vision;

    this.persona.apellido = this.empresa.persona?.apellido;
    this.persona.cedula = this.empresa.persona?.cedula;
    this.persona.celular = this.empresa.persona?.celular;
    this.persona.email = this.empresa.persona?.email;
    this.persona.direccion = this.empresa.persona?.direccion;
    this.persona.fecha_nacimiento = this.empresa.persona?.fecha_nacimiento;
    this.persona.genero = this.empresa.persona?.genero;
    this.persona.idPersona = this.empresa.persona?.idPersona;
    this.persona.nombre = this.empresa.persona?.nombre;
    this.persona.telefono = this.empresa.persona?.telefono;

    this.provincia = this.empresa.provincia;
    this.ciudad = this.empresa.ciudad;

    this.genero = this.persona.genero;

  }

  actualizarEmpresa() {
    //this.toastr.warning('Se esta trabajando aun!','Informacion');
    if (this.actualizaImagen) {
      this.sharedServices.addimage(this.image, 'empresas').subscribe({
        next: (img: string) => (this.empresa.logo = img),
        complete: () =>
          this.updateEmpresa(),
      });
    } else {
      this.updateEmpresa();
    }
  }

  updateEmpresa() {
    this.empresaService.updateEmpresa(this.empresa, this.empresa.idEmpresa).subscribe(
      data => {
        console.log(data);
        this.toastr.success('La empresa se actualizo correctamente!', 'Actualizacion');
        this.limpiar();
      }
    )
  }

  darBajaEmpresa(empresa: Empresa) {
    let title = '';

    this.empresa = empresa;

    console.log(this.empresa);

    if (empresa.estado === true) {
      this.empresa.estado = true;
      empresa.estado = true;
      title = 'Habilitada!';
    } else {
      this.empresa.estado = false;
      empresa.estado = false;
      title = 'Deshabilitada!';
    }

    this.empresaService.updateEmpresa(this.empresa, this.empresa.idEmpresa).subscribe(
      data => {
        console.log(data);
        this.toastr.warning('Empresa ' + title, 'Advertencia!')
        this.limpiar();
      }
    )
  }

  imageSelected(event: any): void {
    this.actualizaImagen = true;
    const file = event.target.files[0];

    console.log(file.name);
    this.image = file;
    this.files.push(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (f) => {
      this.file = reader.result;
    };
  }

  limpiar() {
    this.empresa = new Empresa;
    this.persona = new Persona;
    this.provincia = '';
    this.ciudad = '';
    this.genero = '';

    this.file = '';
    this.actualizaImagen = false;
    this.displayEE = false;

    this.loading = true;
    this.listaEmpresas = [];
    this.obtenerEmpresas();
  }

  /* NO ESCOGE NINGUNA PROVINCIA POR QUE NO ESTA SELECCIONADO
   SOLO CARGA EL QUE ESTABA SELECCIONADO PERO NO ENTRA AL METODO */
  changeCountry(country: any) : string {
    this.states = this.Countries.find((cntry: any) => cntry.name == country.target.value).states;
    console.log('Entro');
    return String(this.states);
    
  }

  changeState(state: any) {
    this.cities = this.Countries.find((cntry: any) => cntry.cities == this.selectedCountry).states.find((stat: any) => stat.name == state.target.value).cities;
  }

}
