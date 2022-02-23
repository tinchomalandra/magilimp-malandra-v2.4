import mostrarProductos from "./components/products/mostrarProductos.js";
import { stockProductos } from "./data/products.js"

document.addEventListener("DOMContentLoaded", (e) => {
    mostrarProductos(PRODUCTS);
})