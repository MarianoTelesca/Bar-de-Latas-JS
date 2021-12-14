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
            imagen: '../imagenes/pampa_golden.png'
        },
        {
            id: 8,
            marca: 'Pampa Brewing Co: Amber Ale',
            precio: 150,
            imagen: '../imagenes/pampa_amber.png'
        },
        {
            id: 9,
            marca: 'Pampa Brewing Co: IPA',
            precio: 150,
            imagen: '../imagenes/pampa_ipa.png'
        },
        {
            id: 10,
            marca: 'Temple: Honey',
            precio: 120,
            imagen: '../imagenes/temple_honey.png'
        },
        {
            id: 11,
            marca: 'Temple: Scottish',
            precio: 120,
            imagen: '../imagenes/temple_scottish.png'
        },
        {
            id: 12,
            marca: 'Temple: Wolf Ipa',
            precio: 120,
            imagen: '../imagenes/temple_ipa.png'
        },
        {
            id: 13,
            marca: 'Peñon del Aguila: Kolsch',
            precio: 160,
            imagen: '../imagenes/pda_kolsch.png'
        },
        {
            id: 14,
            marca: 'Peñon del Aguila: Negra',
            precio: 160,
            imagen: '../imagenes/pda_negra.png'
        },
        {
            id: 15,
            marca: 'Peñon del Aguila: IPA Beta',
            precio: 200,
            imagen: '../imagenes/pda_ipa.png'
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
            const productoTitulo = document.createElement('h5');
            productoTitulo.classList.add('card-title');
            productoTitulo.textContent = info.marca;
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
            productoCardBody.appendChild(productoTitulo);
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
            const miItem = cervezas.filter((itemCervezas) => {
                return itemCervezas.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const producto = document.createElement('li');
            producto.classList.add('list-group-item', 'text-right', 'mx-2');
            producto.textContent = `${numeroUnidadesItem} x ${miItem[0].marca} - $${miItem[0].precio}`;

            // Se crea un boton para borrar el item del carrito
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


    //Función para vaciar el carrito de compras
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

    // Si hay algo en el carrito, al recargar lo trae del localStorage
    function cargarCarritoDeLocalStorage () {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Evento de los botones del carrito
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    DOMbotonComprar.addEventListener('click', finalizarCompra);

    // Inicio
    cargarCarritoDeLocalStorage();
    generarProductos();
    calcularTotal();
    generarCarrito();

}