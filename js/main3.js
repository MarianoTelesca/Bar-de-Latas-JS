class Cerveza {
    
    constructor(id, marca, precio) {
        this.id = id;
        this.marca = marca;
        this.precio = precio;
    }
}

class Pedido {

    constructor(id, cliente, cerveza){
        this.id = id;
        this.cerveza = cerveza;
    }

    registrarPedido(contadorPedido, cliente, cervezaElegida) {
        let pedido = new Pedido(contadorPedido, cliente, cervezaElegida);
        listaPedidos.push(pedido);
        localStorage.setItem("pedido", pedido);  
    }

    mostrarHTML(){
        return `<h1>${this.id}</h1><p> ${this.cliente.nombre}, compraste la cerveza: ${this.cerveza.marca} por ${this.cerveza.precio}</p>`;
    }
}

let listaCerveza = [];
let listaPedidos = [];

let cerveza1 = new Cerveza(1, "Patagonia", 110);
let cerveza2 = new Cerveza(2, "Andes", 100);
let cerveza3 = new Cerveza(3, "Temple", 120);
let cerveza4 = new Cerveza(4, "Pampa Brewing", 150);

listaCerveza.push(cerveza1, cerveza2, cerveza3, cerveza4);

$(document).ready(()=>{
    for(Cerveza of listaCerveza){
    $("#listadoCervezas").append(`<div><h1> ${Cerveza.marca} </h1>
                                    <p>Precio: $ ${Cerveza.precio} </p>
                                    <button id="btnCerveza${Cerveza.id}">Agregar</button></div>`)
    $(`#btnCerveza${Cerveza.id}`).click(()=>{
        console.log(`BIEN ${Cerveza.precio}`)
    })
    };
})



// let continuarPedido = true;
// let contadorPedido = 1;
// let nombre = $("#nombre").val();

// function validarForm(){
// //     if($("#nombre").val() == ""){
// //         alert("El campo Nombre no puede estar vacío.");
// //         $("#nombre").focus();
// //         return false;
// //     }
//     if($("#eleccionCerveza").val() == ""){
//         alert("No puede dejar vacia la eleccion de la cerveza");
//         $("#eleccionCerveza").focus();
//         return false;
//     }

//     return true;
// }

// $(document).ready(()=>{
//     for(Cerveza of listaCerveza){
//         $("#listadoCervezas").append(`<div><h3>ID: ${Cerveza.id} </h3><p> ${Cerveza.marca} ( ${Cerveza.sabor} )</p><p>Precio: $ ${Cerveza.precio} <button id="btnCerveza${Cerveza.id}">Agregar</button></p></div>`)
//         };

//     $("#botonenviar").click( function() { 
//         if(validarForm()){                      
//            $("#formulario").fadeOut("slow");   
//            $("#exito").fadeIn("slow");
//            let numeroCervezaElegida = $("#eleccionCerveza").val();
//            let cervezaElegida = listaCerveza.find( cerveza => cerveza.id === numeroCervezaElegida );                                
//            return cervezaElegida  
//         }
//     });    
//     registrarPedido();   
//     $("#descripcionPedido").append(`${Pedido.mostrarHTML()}`)                     

// });


