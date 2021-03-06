
// Función que valida que los datos necesarios sean completados en el Formulario de Contacto
function validarForm(){
    if($("#form__nombre").val() == ""){
        alert("El nombre no puede estar vacío.");
        $("#form__nombre").focus();
        return false;
    }
    if($("#form__email").val() == ""){
        alert("Debe colocar una dirección de email");
        $("#form__email").focus();
        return false;
    }
    if($("#form__apellido").val() == ""){
        alert("El campo apellido no puede estar vacío.");
        $("#form__apellido").focus();
        return false;
    }
    if($("#form__consulta").val() == ""){
        alert("No puede dejar la consulta en blanco");
        $("#form__consulta").focus();
        return false;
    }

    return true;
}


$(document).ready( function() {

    // Confirmación de envio del formulario en caso de validación exitosa
    $("#botonEnviarForm").click( function() { 
        if(validarForm()){                      
           $("#formularioContacto").slideUp("slow");   
           $("#formularioExitoso").append(`<div class="form" id="formExitoso__contenedor"><h3> Su consulta fue enviada con exito! </h3>
                                            <img src="../imagenes/logo.jpeg" id="img__form"><div>`);
           $("#formExitoso__contenedor").css({"height":"80vh"})   
           $("#img__form").css({"height":"20vh",
                                "width":"20vw"})
           $("#formularioExitoso").slideDown("slow");
        }
    });    
});