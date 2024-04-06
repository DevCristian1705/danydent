export const messageType = {
    algo_salio_mal:
    {
        titulo: 'Algo salió mal',
        body: 'Lo sentimos, se ha presentado un inconveniente. Por favor inténtalo nuevamente.',
        icon: 'assets/iconos/icono-navbar.png',
        nameBoton: 'Aceptar',
        sizeButton: ''
    }, 
    cerrar_sesion:
    {
        titulo: '¿Estas seguro de cerrar sesión?',
        body: 'Se cerrará tu sesión inmediatamente ',
        icon: 'assets/iconos/icono-navbar.png',
        nameBotonConfirm: 'Si',
        nameBotonCancel: 'No',
        sizeButton: ''
    },  
    registro:
    {
        titulo: 'Registro exitoso',
        body: 'Deseas agregar más ',
        icon: 'assets/iconos/icono-navbar.png',
        nameBotonConfirm: 'Si, Agregar',
        nameBotonCancel: 'No, ver lista',
        sizeButton: ''
    },  

}

 
export const messageEncuesta = {
    finish:
    {
        titulo: '!Gracias por participar¡',
        body: 'Hemos llegado al final de las preguntas por lo tanto te mostraremos tu puntaje',
        icon: 'assets/iconos/icono-navbar.png',
        nameBotonConfirm: 'Salir',
        nameBotonCancel: 'Intentar otra vez',
        sizeButton: '',
        puntaje: 0,
        total: 0 
    }
}

export const messageAuth = {
    revisa_tus_datos:
    {
        titulo: 'Datos incorrectos',
        body: 'Alguno de los datos ingresado son incorrectos, revísalos antes de continuar.',
        icon: 'assets/iconos/icono-navbar.png',
        nameBoton: 'Aceptar',
        sizeButton: ''
    },
    datos_existentes:
    {
        titulo: 'Datos Registrados',
        body: 'Estos datos ya se encuentran registrados,debes iniciar sesión.',
        icon: 'assets/iconos/icono-navbar.png',
        nameBoton: 'Iniciar sesión',
        sizeButton: ''
    },
    datos_Noexistentes:
    {
        titulo: 'Datos no existen',
        body: 'Los datos ingresados no están registrados. Te invitamos a registrarte.',
        icon: 'assets/iconos/icono-navbar.png',
        nameBoton: 'Ir a registro',
        sizeButton: ''
    },
 
}
 

export const messageDelete = {
    delete:
    {
        titulo: 'Eliminar',
        body: '¿Estás seguro de eliminar',
        icon: 'assets/iconos/icon-delete.svg',
        nameBotonConfirm: 'Si, Eliminar',
        nameBotonCancel: 'No',
        sizeButton: ''
    }, 
}