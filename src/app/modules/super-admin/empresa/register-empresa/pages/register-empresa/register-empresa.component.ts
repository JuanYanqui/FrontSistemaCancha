import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/core/models/empresa';
import { Persona } from 'src/app/core/models/persona';
import { Rol } from 'src/app/core/models/roles';
import { Usuario } from 'src/app/core/models/usuario';
import { FotoService } from 'src/app/shared/services/foto.service';
import { PersonaService } from 'src/app/shared/services/persona.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { SharedServices } from 'src/app/shared/services/shared.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-register-empresa',
  templateUrl: './register-empresa.component.html',
  styleUrls: ['./register-empresa.component.css']
})
export class RegisterEmpresaComponent {

  empresa: Empresa = new Empresa;
  usuario: Usuario = new Usuario;
  persona: Persona = new Persona;
  rol: Rol = new Rol;

  genero: any;
  bancocoop: any;
  tipocuenta: any;

  file: any = '';

  files: any = [];
  image!: any;

  cuentaBancaria: string = '';
  banco: string = '';
  tipo: string = '';
  numero: string = '';

  cuentas: string[] = [];
  //fechaNacimmiento: Date = new Date;

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

  opcionprov: string = '0';
  opcionciu: string = '0';

  generos: string[] = [
    'Masculino', 'Femenino', 'Otro'
  ];

  bancocoops: string[] = [
    'Banco', 'Cooperativa'
  ];
  tipocuentas: string[] = [
    'Corriente', 'Ahorros'
  ];

  blockSpecial: RegExp = /^[^<>*!]+$/ ///^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=0123456789/;:]+$/
  expCorreo: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  valCorreo: boolean = true;
  verfCorreo: string = '';

  constructor(private sharedServices: SharedServices, private toastr: ToastrService, private rolService: RolesService, private empresaService: EmpresaService, private personaService: PersonaService, private usuarioService: UsuarioService, private router: Router, private fotoService: FotoService) { }

  ngOnInit(): void {
    this.empresa.pais = 'Ecuador';

    this.empresa.acronimo = '';
    this.empresa.ruc = '';
    this.empresa.nombre = '';
    this.empresa.cuentasBancarias = [];

    this.persona.cedula = '';
    this.persona.nombre = '';
    this.persona.apellido = '';

    this.usuario.username = '';
    this.usuario.password = '';
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

  geneneroDef: String = "";
  public capGenero(event: any) {
    this.geneneroDef = event.target.value;
    console.log("Genero => " + this.geneneroDef);
  }

  registrarEmpresa() {
    // guardar imagen en la base

    //    this.persona.genero = this.genero;
    this.empresa.provincia = this.opcionprov;
    this.empresa.ciudad = this.opcionciu;
    //this.persona.fechaNacimiento = this.fechaNacimiento;
    console.log(this.empresa.ciudad);

    // se quitp || this.persona.genero === '' || this.persona.genero === null
    if (this.empresa.acronimo === '' || this.empresa.acronimo === null || this.empresa.celular === '' || this.empresa.celular === null || this.empresa.ciudad === '' || this.empresa.ciudad === null || this.empresa.codigoPostal === '' || this.empresa.codigoPostal === null || this.empresa.correo === '' || this.empresa.correo === null || this.empresa.logo === '' || this.empresa.logo === null || this.empresa.mision === '' || this.empresa.mision === null || this.empresa.nombre === '' || this.empresa.nombre === null || this.empresa.pais === '' || this.empresa.pais === null || this.empresa.provincia === '' || this.empresa.provincia === null || this.empresa.rolComercial === '' || this.empresa.rolComercial === null || this.empresa.ruc === '' || this.empresa.ruc === null || this.empresa.telefono === '' || this.empresa.telefono === null || this.empresa.vision === '' || this.empresa.vision === null
      || this.persona.apellido === '' || this.persona.apellido === null || this.persona.cedula === '' || this.persona.cedula === null || this.persona.celular === '' || this.persona.celular === null || this.persona.email === '' || this.persona.email === null || this.persona.celular === '' || this.persona.celular === null || this.persona.email === '' || this.persona.email === null || this.persona.direccion === '' || this.persona.direccion === null || this.persona.nombre === '' || this.persona.nombre === null || this.persona.telefono === '' || this.persona.telefono === null
      || this.usuario.username === '' || this.usuario.username === null || this.usuario.password === '' || this.usuario.password === null) {
      this.toastr.warning('Posee campo/s vacio/s en el formulario!', 'Alerta');
    } else {
      this.empresaService.verfRuc(this.empresa.ruc).subscribe(
        data => {
          if (!data) {
            this.personaService.getPorCedula(this.persona.cedula).subscribe(
              result => {
                if (result === null) {
                  this.usuarioService.verfUsername(this.usuario.username).subscribe(
                    data => {
                      if (!data) {
                        this.personaService.postPersona(this.persona).subscribe(
                          data => {
                            console.log(data);

                            this.cargarImagen();
                            this.cargarImagenU();
                            this.persona.idPersona = data.idPersona;

                            this.empresa.persona = this.persona;
                            this.empresa.logo = this.nombre_orignal
                            this.empresa.estado = true;

                            //this.sharedServices.addimage(this.image, 'empresas').subscribe({
                            //next: (img: string) => (this.empresa.logo = img),
                            //complete: () =>
                            this.empresaService.postEmpresa(this.empresa).subscribe(
                              result => {
                                console.log(result)
                                this.toastr.success('Empresa registrada correctamente', 'Exitoso!')
                                this.empresa.idEmpresa = result.idEmpresa;

                                this.rolService.getByName('CLIENTE ADMINISTRADOR').subscribe(
                                  data => {
                                    this.rol.descripcion = data.descripcion;
                                    this.rol.idRol = data.idRol;
                                    this.rol.nombre = data.nombre;

                                    this.usuario.persona = this.persona;
                                    // this.usuario.empresa = this.empresa;
                                    this.usuario.rol = this.rol;
                                    this.usuario.estado = true;
                                    // this.usuario.foto = this.nombre_orignal_u;

                                    this.usuarioService.postUsuario(this.usuario).subscribe(
                                      info => {
                                        console.log(info);
                                        this.toastr.success('Usuario registrado correctamente', 'Exitoso!')
                                        this.limpiar();
                                      }
                                    );
                                  }
                                );
                              }
                            )
                            //});
                          }
                        );
                      } else {
                        this.toastr.warning("El username ya está en uso", "Advertencia!");
                      }
                    }
                  )
                } else {

                  this.toastr.warning('La cédula ingresada ya está registrada!', 'Advertencia!');
                }
              }
            )
          } else {
            this.toastr.warning("El ruc ya está en uso", "Advertencia!");
          }
        }
      )
    }
  }

  limpiar() {
    this.empresa = new Empresa;
    this.persona = new Persona;
    this.usuario = new Usuario;
    this.rol = new Rol;

    this.file = '';
    this.empresa.cuentasBancarias = [];
    this.cuentas = [];

    //this.ciudad = '';
    this.banco = '';
    this.tipo = '';
    this.numero = '';
  }

  selected = new FormControl(0);

  // IMAGEN

  message: string = "";
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  // CAPTURO EL ARCHIVO
  nombre_orignal: string = "";

  cap_nombre_archivo: any;
  selectedFile!: File;

  public imageSelected(event: any) {

    this.selectedFile = event.target.files[0];

    // mostrar imagen seleccionada
    this.image = this.selectedFile;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.file = reader.result;
    };

    console.log("Seleciono una imagen: " + event.target.value);
    this.cap_nombre_archivo = event.target.value;
    console.log("Numero de datos del nombre del archivo => " + this.cap_nombre_archivo.length)
    this.nombre_orignal = this.cap_nombre_archivo.slice(12);
    console.log("Nombre imagen original => " + this.nombre_orignal);
    console.log(this.nombre_orignal);
    this.empresa.logo = this.nombre_orignal;

    //this.verImagen();
  }

  cargarImagen() {
    this.fotoService.guararImagenes(this.selectedFile);
  }

  // IMAGEN Usuario

  imagen!: any;
  filem: any = '';
  // CAPTURO EL ARCHIVO
  nombre_orignal_u: string = "";

  cap_nombre_archivo_u: any;
  selectedFiles!: File;

  public imageSelectedl(event: any) {

    this.selectedFiles = event.target.files[0];
    // mostrar imagen seleccionada
    this.imagen = this.selectedFiles;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles);
    reader.onload = () => {
      this.filem = reader.result;
    };

    console.log("Seleciono una imagen: " + event.target.value);
    this.cap_nombre_archivo_u = event.target.value;
    console.log("Numero de datos del nombre del archivo => " + this.cap_nombre_archivo_u.length)
    this.nombre_orignal_u = this.cap_nombre_archivo_u.slice(12);
    console.log("Nombre imagen original => " + this.nombre_orignal_u);
    console.log(this.nombre_orignal_u);

    //this.verImagen();
  }

  cargarImagenU() {
    this.fotoService.guararImagenes(this.selectedFiles);
  }
  
  changeCountry(country: any) {
    this.states = this.Countries.find((cntry: any) => cntry.name == country.target.value).states;
  }

  changeState(state: any) {
    this.cities = this.Countries.find((cntry: any) => cntry.cities == this.selectedCountry).states.find((stat: any) => stat.name == state.target.value).cities;
  }
}
