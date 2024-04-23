
import { Injectable } from "@angular/core"; 
import { Observable,of } from "rxjs";
import { IDatosDevelop, IDatosProfile, IEncuesta, IListExpLaboral, IListProyectos, sideBarOptions, NavbarOptions, menuOptions, ITiempoAlquiler, IMedioPago } from "./../../shared/interfaces/listas";
 

@Injectable({
  providedIn: 'root',
})
  
export class GlobalService {
  //DATOS DE EL DEVELOP
  private datosDevelop : IDatosDevelop[] = [
    {
      name : "Cristian Martinez Fajardo",
      text_lineOne : "Fro",
      text_linetwo : "ntend Develop" ,
      img_dev : "../../assets/imagenes/person-develop.jpeg"
    } 
  ]
 //MENUS
  private menuOptions: menuOptions[] = [
    {
      code: 1,
      name: 'Landing',
      router : '/',
      icon: '../../../assets/iconos/icono-home.png',
      alt_icon: 'icono landing' 
    }, 
    {
      code: 2,
      name: 'Dashboard',
      router : '/dashboard',
      icon: '../../../assets/iconos/icono-home.png',
      alt_icon: 'icono dashboar'
    }, 
    {
      code: 3,
      name: 'Medicos',
      router : '/dashboard/medicos',
      icon: '../../../assets/iconos/icono-home.png',
      alt_icon: 'icono dashboar'
    },
    {
      code: 4,
      name: 'Pacientes',
      router : '/dashboard/pacientes',
      icon: '../../../assets/iconos/icono-home.png',
      alt_icon: 'icono dashboar'
    }, 
    {
      code: 5,
      name: 'Personas',
      router : '/dashboard/personas',
      icon: '../../../assets/iconos/icono-home.png',
      alt_icon: 'icono persona'
    }, 
  ];
  //SIDEBAR
  private sideBarOptions: sideBarOptions[] = [
    {
      code: 1,
      name: 'Inicio',
      icon: '../../../assets/iconos/icono-home.png',
      routerlink: 'home',
    },
    {
      code: 2,
      name: 'Contacto',
      icon: '../../../assets/iconos/icono-contacto.png',
      routerlink: '#contact',
    },
    {
      code: 3,
      name: 'Experiencia',
      icon: '../../../assets/iconos/icono-experiencia.png',
      routerlink: '#jobs',
    },
    {
      code: 4,
      name: 'Proyectos',
      icon: '../../../assets/iconos/icono-proyectos.png',
      routerlink: '#proyectos',
    },
  ];
  //TOOL
  private navBarOption: NavbarOptions[] = [
    { 
      name: 'Inicio', 
      routerlink: '#home',
    },
    { 
      name: 'Experiencia',  
      routerlink: '#jobs',
    },
    { 
      name: 'Proyectos',  
      routerlink: '#proyectos',
    },
    { 
      name: 'Contacto',  
      routerlink: '#contact',
    }
  ];
  //EXP LABORAL
  private ExpLaboralOptions: IListExpLaboral[] = [
    { 
      name_company: 'BANCOM', 
      date_init: '21/11/2022',
      date_end: '25/03/2024',
      img_company: '../../assets/logos/logo-bancom.png',
      altImg : 'logo-bancom'
    }, 
    { 
      name_company: 'TI SOLUCIONES', 
      date_init: '01/01/2022',
      date_end: '15/11/2022',
      img_company: '../../assets/logos/logo-ti-soluciones.jpeg',
      altImg : 'logo-ti-soluciones'
    }, 
    { 
      name_company: 'DEL VALLE', 
      date_init: '15/06/2020',
      date_end: '20/06/2021',
      img_company: '../../assets/logos/logo-del-valle.jpg',
      altImg : 'logo-del-valle'
    }, 
    { 
      name_company: 'MIDIS - PAIS', 
      date_init: '10/05/2018',
      date_end: '03/03/2020',
      img_company: '../../assets/logos/logo-midis-pais.jpg',
      altImg : 'logo-midis'
    }, 
  ];
  // PROYECTOS
  private ProyectosOptions: IListProyectos[] = [
    { 
      name_proyecto: 'GENERADOR CODIGO OTP', 
      description: 'Sistema genera un codigo aleatorio de 4, 6 o hasta de 8 digitos, alfanumericos, string, o numberos, que deben ser insertados en el validador para certificar que el codigo es correcto',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'SIMULADOR DE CAMBIO', 
      description: 'Sistema permite simular el cambio de un monto ingresado, que se calculara con el tipo de cambio actual para saber cuanto dinero tenemos que enviar o cuanto dinero vamos a recibir.',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'BACKGROUND RANDOM', 
      description: 'Sistema genera  un codigo hexadecimal que se asignara como color de fondo a un area, cada vez que le demos click en el boton generar este tomara un nuebo valor por lo tanto el color cambiara',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'ADJUNTAR ARCHIVOS', 
      description: 'Sistema nos permite adjuntar archivos, aqui podemos limitar al usuario, indicando que tipo de formatos y peso estan permitidos y ',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'CARRITO DE COMPRA', 
      description: 'Sistema enfocado a crecer como ecomeerce, donde podemos jugar listando productos en el carrito de compra que va determinar el precio cuando se agrege o se quiten los productos dentro del carrito ',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'CRONOMETRO', 
      description: 'Sistema para indicar a los usuarios que puedes iniciar una actividad basada en un tiempo determinado que puede variar segun los parametros que se etablezcan, como intervalos, o tiempos exactos. ',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'ENCUESTA', 
      description: 'Sistema que te muestra una pregunta y sus opciones segun tu respuesta se marcara como CORRECTO o ERROR, y se iran contabilizando para al final de la encuenta te mostremos un puntaje',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'ORGANIZADOR DE TAREAS', 
      description: 'Sistema donde te mostramos 3 columnas, POR HACER, EN PROCESO, FINALIZADO, se le da al usuario la opcion de crear la tarea, con un TITULO, DESCRIPCION, Y un boton de HECHO para poder cambiar el estado, tambien puede usar la opcion de Drag and Drop para mover las historias al siguiente estado,',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'CALENDARIO', 
      description: 'Sistema para añadir tareas en los dais del calendario, por mes y año, de forma que el usuario pueda ver sus tareas por fecha',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'SISTEMA DE PEDIDOS', 
      description: 'Sistema para llevar el conteo de pedidos, por responsables, cada responsoable muestra un total, y al ver el detalle de dicho responsable podremos ver a los pedidos por responsable.',
      img_proyecto: '', 
      altImg : ''
    }, 
  ];
  //DATOS PERFIL
  private datosProfileOptions: IDatosProfile[] = [
    { 
      titulo: 'Nombre Completo', 
      dato: 'Cristian Hactor Martinez Fajardo'
    }, 
    { 
      titulo: 'Dirección', 
      dato: 'Chincha - Ica - Perú'
    }, 
    { 
      titulo: 'Celular', 
      dato: '934560280'
    }, 
    { 
      titulo: 'Email', 
      dato: 'criiz.mar@gmail.com'
    }, 
    { 
      titulo: 'LinkendIn', 
      dato: 'www.linkedin.com/in/cristian-martinez-fajardo'
    }, 
  ]
  //Datos de Encuenta
  private datosEncuesta : IEncuesta[] = [
    {
      id_encuesta : 0,
      pregunta: '¿Cuál es la capital de Perú?',
      imagen : 'assets/encuesta/capital-peru.jpeg',
      opciones_respuesta : [
      { opcion : 'A', respuesta: 'LIMA', value : true, clase: 'resp--default'},
      { opcion : 'B', respuesta: 'CUZCO', value : false, clase: 'resp--default' },
      { opcion : 'C', respuesta: 'PARIS', value : false, clase: 'resp--default' }] 
    },
    {
      id_encuesta : 1,
      pregunta: '¿Cuál es el valor de "PI"?',
      imagen : 'assets/encuesta/valor-pi.jpeg',
      opciones_respuesta : [
      { opcion : 'A', respuesta: '3.14..', value : true , clase: 'resp--default'},
      { opcion : 'B', respuesta: '27, 000', value : false, clase: 'resp--default' },
      { opcion : 'C', respuesta: '0', value : false , clase: 'resp--default'}] 
    },
    {
      id_encuesta : 2,
      pregunta: '¿Qué platos son típicos en el Perú?',
      imagen : 'assets/encuesta/platos-tipicos.jpeg',
      opciones_respuesta : [
      { opcion : 'A', respuesta: 'Ceviche', value : false, clase: 'resp--default' },
      { opcion : 'B', respuesta: 'Arroz con Pato', value : false, clase: 'resp--default' },
      { opcion : 'C', respuesta: 'Carapulcra', value : false, clase: 'resp--default' },
      { opcion : 'D', respuesta: 'Todas las anteriores', value : true, clase: 'resp--default' }] 
    },
    {
      id_encuesta : 3,
      pregunta: '¿De dónde son originarios los perros Husky-Siberianos?',
      imagen : 'assets/encuesta/siberianos.jpeg',
      opciones_respuesta : [
      { opcion : 'A', respuesta: 'Angola', value : false, clase: 'resp--default' },
      { opcion : 'B', respuesta: 'Siberia', value : true, clase: 'resp--default' },
      { opcion : 'C', respuesta: 'Costa Rica', value : false, clase: 'resp--default' }] 
    },
    {
      id_encuesta : 4,
      pregunta: '¿Cuál es el símbolo químico del agua?',
      imagen : 'assets/encuesta/h20.jpg',
      opciones_respuesta : [
      { opcion : 'A', respuesta: 'Ag', value : false, clase: 'resp--default' },
      { opcion : 'B', respuesta: 'Co', value : false, clase: 'resp--default' },
      { opcion : 'C', respuesta: 'H2O', value : true, clase: 'resp--default' }] 
    },
  ]
  //DATOS TIEMPO ALQUILER JUEGOS
  private datosTiempoAlquiler: ITiempoAlquiler[] = [
    { name : '5 minutos ', code: 5 }, 
    { name : '10 minutos ',code: 10 }, 
    { name : '15 minutos ',code: 15 }, 
    { name : '20 minutos ',code: 20 }, 
    { name : '30 minutos ',code: 30 }, 
    { name : '45 minutos ',code: 45 }, 
    { name : '60 minutos ',code: 60 }, 
  ]

    //DATOS MEDIOS DE PAGO
    private datosMedioPago: IMedioPago[] = [
      { 
        id: '0', 
        name: 'Efectivo'
      }, 
      { 
        id: '1', 
        name: 'Tarjeta'
      }, 
      { 
        id: '2', 
        name: 'Yape'
      },  
      { 
        id: '3', 
        name: 'Plim'
      }, 
      { 
        id: '4', 
        name: 'Otros'
      }, 
    ]

  onCopyCodeText(text: any) {
    navigator.clipboard.writeText(text)
        .then(() => { console.log('Código copiado')})
        .catch((err) => { console.error('Error al copiar el código:', err);
    });
  }

  getSidebar(): Observable<sideBarOptions[]> {
    let sideBarOptions: Observable<sideBarOptions[]> = of(this.sideBarOptions); 
    return sideBarOptions;
  }
 
  getMenu(): Observable<menuOptions[]> {
    let menuOptions: Observable<menuOptions[]> = of(this.menuOptions); 
    return menuOptions;
  }

  getNavBar(): Observable<NavbarOptions[]> { 
    let navBarOption: Observable<NavbarOptions[]> = of(this.navBarOption); 
    return navBarOption;
  }

  getExpLaboral(): Observable<IListExpLaboral[]> { 
    let expOptions: Observable<IListExpLaboral[]> = of(this.ExpLaboralOptions); 
    return expOptions;
  }

  getProyectos(): Observable<IListProyectos[]> { 
    let proyectosOptions: Observable<IListProyectos[]> = of(this.ProyectosOptions); 
    return proyectosOptions;
  }

  getDatosProfile(): Observable<IDatosProfile[]> { 
    let datosOptions: Observable<IDatosProfile[]> = of(this.datosProfileOptions); 
    return datosOptions;
  }

  getDatosDevelop(): Observable<IDatosDevelop[]> { 
    let datosDev: Observable<IDatosDevelop[]> = of(this.datosDevelop); 
    return datosDev;
  }
 
  getDatosEncuesta(): Observable<IEncuesta[]> {  
    let datosEncuesta: Observable<IEncuesta[] >= of(this.datosEncuesta); 
    return datosEncuesta; 
  }
  
  onValidPass(event : any){   
    var contrasenna = event;
    let existeMayuscula = false;
    let existeMinuscula = false;
    let existeNumber = false;
    let existeSimbolo = false;
    let existelengValidate = false;   

    for (var i = 0; i < contrasenna.length; i++) {
        if (contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90) {
            existeMayuscula = true;
        } else if ( contrasenna.charCodeAt(i) >= 97 && contrasenna.charCodeAt(i) <= 122 ) {
            existeMinuscula = true;
        } else if ( contrasenna.charCodeAt(i) >= 48 && contrasenna.charCodeAt(i) <= 57 ) {
            existeNumber = true;
        } else if (
            contrasenna.charCodeAt(i) >= 33 && contrasenna.charCodeAt(i) <= 47 ||
            contrasenna.charCodeAt(i) >= 58 && contrasenna.charCodeAt(i) <= 64 ||
            contrasenna.charCodeAt(i) >= 123 && contrasenna.charCodeAt(i) <= 126
            ) {
            existeSimbolo = true;
        }
    }

    if (contrasenna.length >= 8) { 
        existelengValidate = true;
    }

    if (existeMayuscula && existeMinuscula && existeSimbolo && existelengValidate && existeNumber) {  
        return true;
    }else{
        return false;
    } 
 
  }

  onValidateFormEmail(email: string) {
    let validateEmail: boolean = false;
    if (email) {
      const regex = /(\.{2,}|\.+$)/;
      const dotCount = email.split('.').length - 1;
      if (dotCount > 2 || regex.test(email)) {
        validateEmail = true;
      }
    }

    return validateEmail;
  }


  generateUniqueId(prefix: string): string {
    const randomBuffer = Math.floor(Math.random() * 1000000);
    return prefix + '-' + randomBuffer;
  }


  getTiempoAlquiler(): Observable<ITiempoAlquiler[]> {
    let tiempoalquiler: Observable<ITiempoAlquiler[]> = of(this.datosTiempoAlquiler); 
    return tiempoalquiler;
  }

  getMediosPago(): Observable<IMedioPago[]> {
    let medioPago: Observable<IMedioPago[]> = of(this.datosMedioPago); 
    return medioPago;
  }
} 