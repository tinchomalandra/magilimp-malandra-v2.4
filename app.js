// VARIABLES GLOBALES

let carritoDeCompras = []

const contenedorProductos = document.getElementById('container-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("carrito")) {
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito"))
    actualizarCarrito(carritoDeCompras);
  }
})

document.addEventListener("DOMContentLoaded", (e) => {
  mostrarProductos(PRODUCTS);
})

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');


// FUNCION MOSTRAR PRODUCTOS

mostrarProductos(stockProductos)

function mostrarProductos(array)  {

    contenedorProductos.innerHTML = "";

    array.forEach(producto => {
        let div = document.createElement('div')
        div.className = 'producto card col-md-3'
        div.innerHTML = `
        <p class="text-center align-items-center lead pb-2 pt-3 titulo-prod">
            ${producto.nombre}
        </p>
        <img src="${producto.img}" alt="" class="img-fluid">
        <p class="lead pt-2 text-center align-items-center precio">ARS ${producto.precio}</p>
        <p class="pt-2 text-center align-items-center"${producto.cantidad}</p>
        <p class="pt-2 text-center align-items-center">Código ref: ${producto.id}</p>
        <div class=" text-center align-items-center pb-3">
            <button id="agregarAlCarrito${producto.id}" type="button" class="btn btn-primary">Agregar al carrito</button>
        </div>
        </div>
        `
    contenedorProductos.appendChild(div)

    let btnAgregar = document.getElementById(`agregarAlCarrito${producto.id}`);
    

    btnAgregar.addEventListener('click', ()=> {
        agregarAlCarrito(producto.id)
    })
    });
}


// FUNCION AGREGAR AL CARRITO
function agregarAlCarrito(id){
    let agregarProducto = stockProductos.find(item => item.id == id);
    

    carritoDeCompras.push(agregarProducto)

    actualizarCarrito()

    let div = document.createElement('div')
    div.className = 'productoEnCarrito'
    div.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${agregarProducto.img}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${agregarProducto.nombre}</h5>
          <p class="card-text">ARS ${agregarProducto.precio}</p>
          <p class="card-text"><small class="text-muted">${agregarProducto.cantidad}</small></p>
          
        </div>
      </div>
    </div>
    <button type="button" id="btnEliminar${agregarProducto.id}" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button>
  </div>`

    contenedorCarrito.appendChild(div)

    let btnEliminar = document.getElementById(`btnEliminar${agregarProducto.id}`)

    btnEliminar.addEventListener('click', () => {
        
        btnEliminar.parentElement.remove()
        // elimina casi todo, pero no borra la imagen
        carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id != agregarProducto.id)
        actualizarCarrito()
    })
}




// FUNCION ACTUALIZAR CARRITO

function actualizarCarrito (){
    contadorCarrito.innerText = carritoDeCompras.reduce((acc,el) => (acc + el.unidades),0)
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.unidades),0)

    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras))

}