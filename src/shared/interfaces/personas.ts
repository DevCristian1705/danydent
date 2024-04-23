export interface IMedico {
    id_medico : string
    names :string,
    last_name: string,
    cellphone : number,
    email : string, 
    photo: string
}


// export interface IPersona {
//     id_persona : number,
//     document_number: number,
//     names :string,
//     last_name: string,
//     email : string, 
//     cellphone : number,
//     photo: string
// }


export interface IPersona {
    id_persona : string,
    names :string,
    tiempo : string,
    tiempo_code : number,
    tipo_pago: string
    document_number: number,
    isActive: boolean, 
}

 