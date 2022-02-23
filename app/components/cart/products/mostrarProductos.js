import agregarAlCarrito from "../agregarAlCarrito.js";


const contenedorProductos = document.getElementById('contenedor-productos');

export default function mostrarProductos(array) {
    array.forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('producto card col-md-3')
        div.innerHTML += `
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
        `;

        contenedorProductos.appendChild(div);

        let boton = document.addEventListener(`boton${producto.id}`)

        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id);
        });
    });
}