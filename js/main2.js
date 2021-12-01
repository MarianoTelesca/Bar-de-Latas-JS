//Para el desafio ajax traté de traer los datos de un json

$(document).ready(()=>{

const JSONCervezas = "../json/cervezas.json"

        $.getJSON(JSONCervezas, function(respuesta, estado) {
            if(estado === "success"){
                let objetosCerveza = respuesta.Cerveza[i]
                for(i = 0; i<objetosCerveza.length; i++){
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
                }
            } else{
                console.log(estado);
                }
        })

})

//(dato of objetosCerveza)