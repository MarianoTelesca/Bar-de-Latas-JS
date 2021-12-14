window.onload = function(){
    const cervezas = [
        {
            id: 1,
            marca: 'Patagonia: Bohemian Pilsner',
            precio: 110,
            imagen: '../imagenes/patagonia_bohemian.png'
        },
        {
            id: 2,
            marca: 'Patagonia: Amber Lager',
            precio: 110,
            imagen: '../imagenes/patagonia_amber.png'
        },
        {
            id: 3,
            marca: 'Patagonia: IPA 24.7',
            precio: 110,
            imagen: '../imagenes/patagonia_ipa.png'
        },
        {
            id: 4,
            marca: 'Andes: Rubia',
            precio: 100,
            imagen: '../imagenes/andes_rubia.png'
        },
        {
            id: 5,
            marca: 'Andes: Roja',
            precio: 100,
            imagen: '../imagenes/andes_roja.png'
        },
        {
            id: 6,
            marca: 'Andes: IPA',
            precio: 100,
            imagen: '../imagenes/andes_ipa.png'
        },
        {
            id: 7,
            marca: 'Pampa Brewing Co: Golden',
            precio: 150,
            imagen: '../imagenes/cerveza_pampa.jpg'
        },
        {
            id: 8,
            marca: 'Pampa Brewing Co: Amber Ale',
            precio: 150,
            imagen: '../imagenes/cerveza_pampa.jpg'
        },
        {
            id: 9,
            marca: 'Pampa Brewing Co: IPA',
            precio: 150,
            imagen: '../imagenes/cerveza_pampa.jpg'
        },
        {
            id: 10,
            marca: 'Temple: Honey',
            precio: 120,
            imagen: '../imagenes/cerveza_temple.jpg'
        },
        {
            id: 11,
            marca: 'Temple: Scottish',
            precio: 120,
            imagen: '../imagenes/cerveza_temple.jpg'
        },
        {
            id: 12,
            marca: 'Temple: Wolf Ipa',
            precio: 120,
            imagen: '../imagenes/cerveza_temple.jpg'
        },
        {
            id: 13,
            marca: 'Peñon del Aguila: Kolsch',
            precio: 160,
            imagen: '../imagenes/cerveza_pda.jpg'
        },
        {
            id: 14,
            marca: 'Peñon del Aguila: Negra',
            precio: 160,
            imagen: '../imagenes/cerveza_pda.jpg'
        },
        {
            id: 15,
            marca: 'Peñon del Aguila: IPA Beta',
            precio: 200,
            imagen: '../imagenes/cerveza_pda.jpg'
        }
    ];


    let carrito = [];
    let total = 0;
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const DOMbotonComprar = document.querySelector('#boton-comprar');
    const miLocalStorage = window.localStorage;

    // Funciones


    // Genera los productos. 
    function generarProductos() {
        cervezas.forEach((info) => {
            // Estructura
            const producto = document.createElement('div');
            producto.classList.add('card', 'col-sm-4');
            // Body
            const productoCardBody = document.createElement('div');
            productoCardBody.classList.add('card-body');
            // Titulo
            const productoTitle = document.createElement('h5');
            productoTitle.classList.add('card-title');
            productoTitle.textContent = info.marca;
            // Imagen
            const productoImagen = document.createElement('img');
            productoImagen.classList.add('img-fluid');
            productoImagen.setAttribute('src', info.imagen);
            // Precio
            const productoPrecio = document.createElement('p');
            productoPrecio.classList.add('card-text');
            productoPrecio.textContent = '$' + info.precio;
            // Boton 
            const productoBoton = document.createElement('button');
            productoBoton.classList.add('btn', 'btn-primary');
            productoBoton.textContent = '+';
            productoBoton.setAttribute('marcador', info.id);
            productoBoton.addEventListener('click', agregarProductoAlCarrito);
            // Insertamos
            productoCardBody.appendChild(productoImagen);
            productoCardBody.appendChild(productoTitle);
            productoCardBody.appendChild(productoPrecio);
            productoCardBody.appendChild(productoBoton);
            producto.appendChild(productoCardBody);
            DOMitems.appendChild(producto);
        });
    }

    // Evento para añadir un producto al carrito de la compra
    function agregarProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        calcularTotal();
        generarCarrito();
        guardarCarritoEnLocalStorage();
    }


    // Genera los productos guardados en el carrito y evita que se creen multiples en caso de mayor cantidad del producto
    function generarCarrito() {
        DOMcarrito.textContent = '';

        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = cervezas.filter((itemCervezas) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemCervezas.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el producto del item del carrito
            const producto = document.createElement('li');
            producto.classList.add('list-group-item', 'text-right', 'mx-2');
            producto.textContent = `${numeroUnidadesItem} x ${miItem[0].marca} - $${miItem[0].precio}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            producto.appendChild(miBoton);
            DOMcarrito.appendChild(producto);
        });
    }


    // Evento para borrar un elemento del carrito y actualizar el precio
    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        generarCarrito();
        calcularTotal();
        guardarCarritoEnLocalStorage();
    }


    // Calcula el precio total teniendo en cuenta los productos repetidos y lo escribe en el html
    function calcularTotal() {
        total = 0;
        carrito.forEach((item) => {
            const miItem = cervezas.filter((itemCervezas) => {
                return itemCervezas.id === parseInt(item);
            });
            total = total + miItem[0].precio;
        });
        DOMtotal.textContent = '$' + total.toFixed(2);
    }


    //Función para vaciar el carrito de comprar
    function vaciarCarrito() {
        carrito = [];
        generarCarrito();
        calcularTotal();
        localStorage.clear();
    }

    function finalizarCompra() {
        vaciarCarrito();
        $("#carrito").append(`<div id="compraExitosa"> 
                                <h1>Muchas gracias!</h1>
                                <p>Su reserva ha sido realizada con exito! Podrá retirar el producto en BarDeLatas, y realizar el pago en el momento.</p>
                              </div>`);
    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    DOMbotonComprar.addEventListener('click', finalizarCompra);

    // Inicio
    cargarCarritoDeLocalStorage();
    generarProductos();
    calcularTotal();
    generarCarrito();

}