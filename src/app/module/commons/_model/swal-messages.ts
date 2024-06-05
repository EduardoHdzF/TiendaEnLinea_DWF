import Swal from "sweetalert2";

export class SwalMessages{

    confirmMessage: any;

    constructor(){
        this.confirmMessage = Swal.mixin({
            customClass: {
                title: 'swal-title',
                icon: 'swal-icon',
                confirmButton: 'btn btn-primary swal-confirm-button',
                cancelButton: 'btn btn-danger swal-cancel-button',
            },
            buttonsStyling: false
        });
    }

    // muestra mensaje de confirmación
    successMessage(message: string){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            text: message,
            background: '#E8F8F8',
            showConfirmButton: false,
            timer: 10000
        });
    }
   
    // muestra mensaje de error
    errorMessage(message: string){
        if(message === 'FORBIDDEN'){
            message = "Necesita iniciar sesión";
        }else if(message === 'El acceso al recurso no está autorizado'){
            message = "No tiene los permisos para realizar esa acción"
        }
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            text: message,//"Error de conexion con la base de datos",
            background: '#F8E8F8',
            showConfirmButton: false,
            timer: 10000
        });
    }
}
