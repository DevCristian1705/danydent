export interface sideBarOptions {
    code: number,
    name: string,
    icon: string, 
    routerlink: string,
}
 
export interface menuOptions {
    code: number,
    name: string,
    icon: string,   
    alt_icon: string,   
    router? : string, 
}

   
export interface NavbarOptions  { 
    name: string,  
    routerlink: string,
}

export interface IListExpLaboral  { 
    name_company: string,  
    date_init: string,
    date_end: string,
    img_company: string,
    altImg : string
}

export interface IListProyectos  { 
    name_proyecto: string,  
    description: string,
    img_proyecto: string, 
    altImg : string
}
   
export interface IDatosProfile  { 
    titulo: string,  
    dato: string,
}

export interface IDatosDevelop  {  
    name: string,
    text_lineOne: string,
    text_linetwo: string,
    img_dev: string,
}
 
export interface IRespuestas {
	opcion : string;
 	respuesta: string;
 	value : boolean;
    clase : string
}
  
export interface IEncuesta  {
	id_encuesta : number;
	pregunta: string;
    imagen : string;
	opciones_respuesta : IRespuestas[] 
}

export interface ITiempoAlquiler  { 
    code: number,  
    name: string,
}

export interface IMedioPago { 
    id: string,  
    name: string,
}