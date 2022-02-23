import actualizarCarrito from "./actualizarCarrito.js";
import { PRODUCTS } from "../../data/products.js";

let carritoDeCompras = []
const contenedorCarrito = document.getElementById('carrito-contenedor');

document.addEventListener("DOMContentLoaded", (e) => {
    if (localStorage.getItem("carrito")) {
        carritoDeCompras = JSON.parse(localStorage.getItem("carrito"))
        actualizarCarrito(carritoDeCompras);
    }
})

export default function agregarAlCarrito(id) {
    let repetido = carritoDeCompras.find(productoR => productoR.id == id);
    if (repetido){
        repetido.cantidad = repetido.cantidad + 1;
        document.getElementById(`cantidad ${repetido.id}`).innerHTML = `<p id=cantidad${repetido.id}>Cantidad:${repetido.cantidad}</p>`;
        actualizarCarrito(carritoDeCompras);
    } else{
        let producto = PRODUCTS.find(prod => prod.id == id);
        carritoDeCompras.push(producto);
        console.log(carritoDeCompras);

        producto.cantidad = 1;
        let div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `<p>${producto.nombre}</p>
                    <p>Precio:${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad:${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`;

        contenedorCarrito.appendChild(div);

        actualizarCarrito(carritoDeCompras);

        let botonEliminar = document.getElementById(`eliminar${producto.id}`);

        botonEliminar.addEventListener('click', () => {
            botonEliminar.parentElement.remove();
            carritoDeCompras = carritoDeCompras.filter(el => el.id != producto.id);
            actualizarCarrito(carritoDeCompras);
        });
    }
}