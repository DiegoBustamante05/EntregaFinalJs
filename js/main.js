class Producto {
    constructor(nombre, stock, precio, descuento, id, categoria, imagen, cantidad) {
        this.nombre = nombre;
        this.stock = stock;
        this.precio = precio;
        this.descuento = descuento;
        this.id = id;
        this.categoria = categoria;
        this.imagen = imagen;
        this.cantidad = cantidad;
    }
}



const productoA = new Producto("Rig 6x AMD 6600xt 6gb", 10, 700000, 0.95, 1, "Rig","imagenes/RigCard.png",1)
const productoB = new Producto("Gigabyte Rtx 3070 8gb LHR", 60, 130000, 0.95, 2, "Hardware", "imagenes/Gpu.png",1)
const productoC = new Producto("Mother Asrock h510 BTC", 30, 40000, 0.95, 3, "Hardware", "https://i.ibb.co/ZWm8gK3/Mother-Card.png",1)
const productoD = new Producto("Riser v009s Goldtech Usb oro", 100, 2000, 0.95, 4, "Hardware", "imagenes/Riser.png",1)
const productoE = new Producto("Safepal S1 Wallet Cripto", 10, 20000, 0.95, 5, "Hardware", "imagenes/WalletCard.png",1)
const productoF = new Producto("Intel Celeron G5905 S1151", 20, 8000, 0.95, 6, "Hardware", "imagenes/ProcesadorCard.png",1)
const productoG = new Producto("G. Skill Trident z DDR4 3200", 10, 16000, 0.95, 7, "Hardware", "imagenes/Ram.png",1)
const productoH = new Producto("Seasonic 850w Modular", 5, 40000, 0.95, 8, "Hardware", "imagenes/Fuente 2.png",1)



const listaProductos = [productoA, productoB, productoC, productoD,productoE, productoF, productoG, productoH];

/* Cargar al abrir la web */
crearCards(listaProductos);
const cartStorage = localStorage.getItem('carrito');
let cart = JSON.parse(cartStorage) ?? []; 
cart.forEach((producto) => {
    document.getElementById('nombreProductosEnElCarrito').innerHTML +=`
    <div class="productoEnCarrito col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between border-top border-bottom fw-bolder text-center align-items-center">
    <p class="col-3">Producto: <br>${producto.nombre}</br></p>
    <p "col-3">Precio c/u <br>$ ${producto.precio}</br></p>
    <p "col-3">Cantidad: <span id="cantidad"><br>${producto.cantidad}</br></span></p>
    <button class="btn-sm col-3" onclick="eliminarDelCarrito(${producto.id})"><img src="imagenes/remove.png"</img></button>
    </div>
    `
})
infoCarrito();


/* card productos*/
function crearCards(arrayProductos){
    let acumulador = "";
    arrayProductos.forEach((producto) => {
        acumulador += `
        <div class="col mb-5">
        <div class="card h-100">
            <img class="card-img-top" src="${producto.imagen}" alt="..." />
            <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder">${producto.nombre}</h5>
                    <div class="d-flex justify-content-center small text-warning mb-2">
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                    </div>
                    $${producto.precio}
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"><a class="btn btn-primary btn-outline-dark mt-auto colorCard" onclick="agregarAlCarrito(${producto.id})" href="#">Add to cart</a></div>
            </div>
        </div>
    </div>`
    })
    document.getElementById("card-container").innerHTML = acumulador;
}

const nombreProductosCarrito = document.getElementById('nombreProductosEnElCarrito')

/* Agregar al carrito*/
function agregarAlCarrito(id) {

    const existe = cart.some((producto) => producto.id === id);

    if (existe) {
        const elemento = cart.map (producto => {
            if (producto.id === id){
                producto.cantidad++
                Swal.fire({
                    title: 'Agregaste al Carrito.',
                    text: producto.nombre,
                    imageUrl: producto.imagen,
                    imageWidth: 350,
                    imageHeight: 200,
                })
            }
        })
    } else{
        const resultado = listaProductos.find((producto) => producto.id === id);
        cart.push(resultado)
        Swal.fire({
            title: 'Agregaste al Carrito.',
            text: resultado.nombre,
            imageUrl: resultado.imagen,
            imageWidth: 350,
            imageHeight: 200,
        })
    }
    nombreProductosCarrito.innerHTML = ""
    cardsCarrito()
    infoCarrito()
    storage()
}

/* Mostrar informacion carrito*/
function infoCarrito(id){
    let cantidadProductos = Object.values(cart).reduce((acumulador , {cantidad}) => acumulador + cantidad, 0)
    document.getElementById("productosEnCarrito").innerHTML = cantidadProductos 
    const totalCarrito = cart.reduce((acumulador, producto) => acumulador + producto.precio * producto.descuento * producto.cantidad, 0);
    document.getElementById("totalCarrito").innerHTML = "Total $" + totalCarrito;
}


function storage(){
    const cartJson = JSON.stringify(cart);
    localStorage.setItem('carrito', cartJson);
}

/* Mostrar productos en carrito*/
function cardsCarrito(){
    cart.forEach((producto) => {
        nombreProductosCarrito.innerHTML +=
        `
        <div class="productoEnCarrito col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between border-top border-bottom fw-bolder text-center align-items-center">
        <p class="col-3">Producto: <br>${producto.nombre}</br></p>
        <p "col-3">Precio c/u <br>$ ${producto.precio}</br></p>
        <p "col-3">Cantidad: <span id="cantidad"><br>${producto.cantidad}</br></span></p>
        <button onclick="eliminarDelCarrito(${producto.id})" class="btn-sm col-3"><img src="imagenes/remove.png"</img></button>
        </div>
        `
    })
}

/* eliminar productos del carrito*/
const eliminarDelCarrito = (id) => {
    const item = cart.find((producto) => producto.id === id)
    const indice = cart.indexOf(item) 
    cart.splice(indice, 1)
    storage()
    nombreProductosCarrito.innerHTML = 0
    cart.forEach((producto) => {
        nombreProductosCarrito.innerHTML +=
        `
        <div class="productoEnCarrito col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between border-top border-bottom fw-bolder text-center align-items-center">
        <p class="col-3">Producto: <br>${producto.nombre}</br></p>
        <p "col-3">Precio c/u <br>$ ${producto.precio}</br></p>
        <p "col-3">Cantidad: <span id="cantidad"><br>${producto.cantidad}</br></span></p>
        <button onclick="eliminarDelCarrito(${producto.id})" class="btn-sm col-3"><img src="imagenes/remove.png"</img></button>
        </div>
        `
    })
    infoCarrito()
}


/*Pagina Nosotros*/
const about = document.getElementById("about")

about.onclick = () => {
    const nosotros = document.getElementById("productos");
    nosotros.className += " d-none";
    document.getElementById("card-container").remove();
    document.getElementById("nosotros").innerHTML =`
    <div class="container-fluid">
        <div class="row reverse">
            <div class="col-lg-8 col-md-12 col-sm-12">
                <h1 class="text-center my-5">Nosotros</h1>
                <p class="mx-5">Somos una empresa familiar fundada en la ciudad de Bahía Blanca en el año 2021. Nuestro principal capital invertido fue esfuerzo, trabajo y las ganas de superarnos día a día con la esperanza de crear una estructura sólida que nos permitiera hacer frente a los distintos desafíos que se nos podían presentar a lo largo del tiempo. Apoyados en alianzas estratégicas con las principales marcas tecnológicas nos fuimos volviendo referentes del mercado, ampliando nuestra oferta a más de 200 productos de última generación, los cuales mantenemos y renovamos día a día con el objetivo de trasladar a nuestros clientes la excelencia, calidad, innovación y vanguardia que nos exigimos en cada paso que damos.</p>
                <h4 class="text-center mt-5">Nuestra Vision</h4>
                <p class="mt-4 m-5">
                Bahía Cripto Mining es una compañía fundada con el objetivo de proveer hardware de minería en Argentina. Como parte de esta visión, buscamos desarrollar relaciones a largo plazo con nuestros clientes. La honestidad y comunicación permanente desde el inicio son los pilares fundamentales sobre los cuales construimos esa relación.
                </p>
            </div>
            <div class="col-lg-4 col-md-12 col-sm-12 d-flex justify-content-md-center justify-content-sm-center mt-3">
                <img class="w-100 mb-4" src="../imagenes/nosotros.png" alt="">
            </div>
        </div>
    </div>
`
}

/* Filtro Categorias*/
function filtroCategorias(categoria){
    const categoriasProductos = document.getElementById('productos')
    categoriasProductos.classList.remove('d-none');
    document.getElementById("catCards").innerHTML =`<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center" id="card-container">
    </div>`
    const categorias = listaProductos.filter((producto) => producto.categoria == categoria)
    crearCards(categorias)
    const catMenor = document.getElementById("menorPrecioCat")
    catMenor.onclick = () => {
    filtroCategorias(categoria)
    ordenarPrecio()
    }
    const catMayor = document.getElementById("mayorPrecioCat")
    catMayor.onclick = () => {
    filtroCategorias(categoria)
    ordenarPrecio()
    const mayor = categorias.reverse()
    crearCards(mayor)
    }
}



const removerMargenCategorias = document.getElementById('productos')


const catRig = document.getElementById("rig")
catRig.onclick = () => {
    document.getElementById("nosotros").innerHTML =`
    <div class="container px-4 px-lg-5 mt-5">
    <h1 class="text-center my-5"> Rig </h1>
    <ul class="navbar-nav me-auto ">
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle text-dark px-2 m-2 btn border-dark botonPrecio" id="navbarDropdown ordenarPrecioRig" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ordenar por</button>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" id="menorPrecioCat">Menor Precio</a></li>
                <li><a class="dropdown-item" href="#!" id="mayorPrecioCat">Mayor Precio</a></li>
            </ul>
        </li>
    </ul>   
    `
    filtroCategorias("Rig")
    removerMargenCategorias.classList.remove('py-5');
}

const catHardware = document.getElementById("hard")
catHardware.onclick = () => {
    document.getElementById("nosotros").innerHTML =`
    <div class="container px-4 px-lg-5 mt-5">
    <h1 class="text-center my-5"> Hardware </h1>
    <ul class="navbar-nav me-auto ">
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle text-dark px-2 m-2 btn border-dark botonPrecio" id="navbarDropdown ordenarPrecioHardware" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ordenar por</button>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" id="menorPrecioCat">Menor Precio</a></li>
                <li><a class="dropdown-item" href="#!" id="mayorPrecioCat">Mayor Precio</a></li>
            </ul>
        </li>
    </ul>   
    `
    filtroCategorias("Hardware")
    removerMargenCategorias.classList.remove('py-5');
}


/* Ordenar precio productos de menor a mayor*/
function ordenarPrecio(){
    listaProductos.sort((a, b) => {
        return a.precio - b.precio
    })
}


const menorPrecio = document.getElementById("menorPrecio")
menorPrecio.onclick = () => {
    ordenarPrecio()
    crearCards(listaProductos)
}

/* Ordenar precio productos de mayor a menor*/
const mayorPrecio = document.getElementById("mayorPrecio")
mayorPrecio.onclick = () => {
    ordenarPrecio()
    listaProductos.reverse()
    crearCards(listaProductos)
}

/* Borrar todos los productos del carrito*/
let vaciar = document.getElementById("vaciar")
vaciar.addEventListener('click', () => {
    cart = []
    nombreProductosCarrito.innerHTML = ""
    infoCarrito()
    storage()
})

/*API*/
let endpoint ='https://api.binance.com/api/v3/ticker/price'
fetch(endpoint)
.then((response) => response.json())
.then( data => {
    document.getElementById('datos').innerHTML = `<tr><td>${data[11].symbol}</td><td>${data[11].price}</td></tr> <tr><td>${data[12].symbol}</td><td>${data[12].price}</td></tr> <tr><td>${data[98].symbol}</td><td>${data[98].price}</td></tr>`
})
.catch (() => {})