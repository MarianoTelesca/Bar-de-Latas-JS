function validarForm(){
    if($("#nombre").val() == ""){
        alert("El nombre no puede estar vacío.");
        $("#nombre").focus();
        return false;
    }
    if($("#apellido").val() == ""){
        alert("El campo apellido no puede estar vacío.");
        $("#apellido").focus();
        return false;
    }
    if($("#consulta").val() == ""){
        alert("No puede dejar la consulta en blanco");
        $("#consulta").focus();
        return false;
    }
    if(!$("#mayorEdad").is(":checked")){
        alert("Debe confirmar que es mayor de 18 años.");
        return false;
    }

    return true;
}

$(document).ready( function() {
    $("#botonEnviarForm").click( function() { 
        if(validarForm()){                      
           $("#formularioContacto").slideUp("slow");   
           $("#formularioExitoso").append(`<div><h3> Su consulta fue enviada con exito! </h3><div>`);
           $("#formularioExitoso").slideDown("slow");
        }
    });    
});