class Cerveza {
    
    constructor(id, marca, sabor, precio, imagen, descripcion) {
        this.id = id;
        this.marca = marca;
        this.sabor = sabor;
        this.precio = precio;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.cantidad = 0
    }
}

// class Cliente {
//     constructor(id, nombre) {
//         this.id = id;
//         this.nombre = nombre;
//     }
// }

// class Pedido {

//     constructor(id, cliente, cerveza){
//         this.id = id;
//         this.cliente = cliente;
//         this.cerveza = cerveza;
//     }

//     mostrarHTML(){
//         return `<h1>${this.id}</h1><p> ${this.cliente.nombre}, compraste la cerveza: ${this.cerveza.marca} por ${this.cerveza.precio}</p>`;
//     }
// }

let listaCerveza = [];
// let listaPedidos = [];

let cerveza1 = new Cerveza(1, "Patagonia", "Bohemian Pilsner", 110, "../imagenes/cerveza_patagonia.jpg", "Es una cerveza que se caracteriza por su color dorado brillante y aroma maltoso, como a pan. IBU 18, 5.1% graduación alcoholica.");
let cerveza2 = new Cerveza(2, "Andes", "Roja", 100, "../imagenes/cervezas_andes.jpg", "Es una cerveza estilo Vienna Lager, su aroma a suave caramelo y leve lúpulo logran un balance perfecto. De color ámbar cobrizo. IBU 18, 5,1% graduación alcoholica.");
let cerveza3 = new Cerveza(3, "Temple", "Honey", 120, "../imagenes/cerveza_temple.jpg", "Cerveza roja. Tiene un perfil a tostado y caramelo. De color cobrizo. 5.5% de graduación alcoholica y 24 de ibu (Amargor).");
let cerveza4 = new Cerveza(4, "Pampa Brewing", "Amber Ale", 150, "../imagenes/cerveza_pampa.jpg", "Sabor moderado a malta caramelo y toffee. IBU 20, 4.9% graduación alcoholica.");
let cerveza5 = new Cerveza(5, "Peñon del Aguila", "Kolsch", 160, "../imagenes/cerveza_pda.jpg", "Estilo alemán, de la zona de Colonia. De color dorado pálido y cuerpo liviano. Presenta aromas a lúpulo y cítricos.");

listaCerveza.push(cerveza1, cerveza2, cerveza3, cerveza4, cerveza5);

$(document).ready(()=>{
    for(Cerveza of listaCerveza){
       $("#listaCervezas").append(` 
       <div class="col" >
          <div class="card">
            <img src="${Cerveza.imagen}" class="card-img-top" alt="Latas de cerveza marca ${Cerveza.marca} en todas las variedades disponibles">
            <div class="card-body">
                <h2 class="card-title"> ${Cerveza.marca} </h2>
                <p class="card-text"> ${Cerveza.sabor} : ${Cerveza.descripcion} </p> 
                <p> <button id="btnCerveza${Cerveza.id}"> Agregar al carrito </button> </p> 
            </div> 
          </div> 
        </div>`)
   
        $(`#btnCerveza${Cerveza.id}`).click(()=>{
            console.log(`BIEN ${Cerveza.precio}`);
            alert(`Elegiste la ${Cerveza.marca}, a $ ${Cerveza.precio}`);
        });
   
    };
})


// let contadorPedido = 1;
// let nombre = $("#nombre").val();
// let cliente = new Cliente(1, nombre);

// function validarForm(){
//     if($("#nombre").val() == ""){
//         alert("El campo Nombre no puede estar vacío.");
//         $("#nombre").focus();
//         return false;
//     }
//     if($("#eleccionCerveza").val() == ""){
//         alert("No puede dejar vacia la eleccion de la cerveza");
//         $("#eleccionCerveza").focus();
//         return false;
//     }

//     return true;
// }

// $(document).ready( function() {
//     $("#botonenviar").click( function() { 
//         if(validarForm()){                      
//            $("#formulario").fadeOut("slow");   
//            $("#exito").fadeIn("slow");
//            $("#descripcionPedido").append(`${pedido.mostrarHTML()}`)                     
//         }
//     });    
// });

// let numeroCervezaElegida = $("#eleccionCerveza").val();
// let cervezaElegida = listaCerveza.find( cerveza => cerveza.id === numeroCervezaElegida );                                
// let pedido = new Pedido(contadorPedido, cliente, cervezaElegida);
// listaPedidos.push(pedido);
// localStorage.setItem("pedido", pedido);