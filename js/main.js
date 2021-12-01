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

let listaCerveza = [];
let cerveza1 = new Cerveza(1, "Patagonia", "Bohemian Pilsner", 110, "../imagenes/cerveza_patagonia.jpg", "Es una cerveza que se caracteriza por su color dorado brillante y aroma maltoso, como a pan. IBU 18, 5.1% graduación alcoholica.");
let cerveza2 = new Cerveza(2, "Andes", "Roja", 100, "../imagenes/cervezas_andes.jpg", "Es una cerveza estilo Vienna Lager, su aroma a suave caramelo y leve lúpulo logran un balance perfecto. De color ámbar cobrizo. IBU 18, 5,1% graduación alcoholica.");
let cerveza3 = new Cerveza(3, "Temple", "Honey", 120, "../imagenes/cerveza_temple.jpg", "Cerveza roja. Tiene un perfil a tostado y caramelo. De color cobrizo. 5.5% de graduación alcoholica y 24 de ibu (Amargor).");
let cerveza4 = new Cerveza(4, "Pampa Brewing", "Amber Ale", 150, "../imagenes/cerveza_pampa.jpg", "Sabor moderado a malta caramelo y toffee. IBU 20, 4.9% graduación alcoholica.");
let cerveza5 = new Cerveza(5, "Peñon del Aguila", "Kolsch", 160, "../imagenes/cerveza_pda.jpg", "Estilo alemán, de la zona de Colonia. De color dorado pálido y cuerpo liviano. Presenta aromas a lúpulo y cítricos.");
listaCerveza.push(cerveza1, cerveza2, cerveza3, cerveza4, cerveza5);




$(document).ready(()=>{
    for(i = 0; i<listaCerveza.length; i++){
        let objetosCerveza = listaCerveza[i];
        // Creación de las Cards con cada una de los productos instanciados
       $("#listaCervezas").append(` 
       <div class="col" >
          <div class="card">
            <img src="${objetosCerveza.imagen}" class="card-img-top" alt="Latas de cerveza marca ${objetosCerveza.marca} en todas las variedades disponibles">
            <div class="card-body">
                <h2 class="card-title"> ${objetosCerveza.marca} </h2>
                <p class="card-text"> ${objetosCerveza.sabor} : ${objetosCerveza.descripcion} </p> 
                <p class="card-text"> ${objetosCerveza.precio} </p>
                <p> <button id="btnCerveza${objetosCerveza.id}"> Agregar al carrito </button> </p> 
            </div> 
          </div> 
        </div>`)
   
        // Evento de click de los botones creados para el "registro" del producto elegido dentro del carrito de compras
        $(`#btnCerveza${objetosCerveza.id}`).click(()=>{
            objetosCerveza.cantidad = objetosCerveza.cantidad + 1
            $(`.carritoCompras`).append(`   <img src="${objetosCerveza.imagen}" class="imgCarrito" alt="Latas de cerveza marca ${objetosCerveza.marca}">
                                            <div class="">
                                                <p class=""> ${objetosCerveza.marca} </p>
                                                <p class=""> ${objetosCerveza.sabor} </p> 
                                                <p> $ ${objetosCerveza.precio} x ${objetosCerveza.cantidad} </p> 
                                            </div> `);
            $(`.imgCarrito`).css( { "width":"10vw",
                                    "height":"10vh" } );
            console.log(`${objetosCerveza.cantidad}`);
        });



        //Acción de que aparezca y desaparezca el carrito a traves de un boton en la barra de navegacion
        $(`.carritoComprasShow`).click(()=>{
            $(`.carritoCompras`).css( { "position":"relative",
                                        "overflow":"scroll",
                                        "z-index":"10",
                                        "border" : "solid 1 black",
                                        } );

            $(`.carritoCompras`).fadeToggle("slow");
        });
   
    };
})
