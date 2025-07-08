const productos = [
    { id: 1, nombre: "Remera Oficial", precio: 58000, imagen: "../medios/remera.png" },
    { id: 2, nombre: "Gorra Don't Trip", precio: 30000, imagen: "../medios/gorra.jfif" },
    { id: 3, nombre: "Vinilo Firmado", precio: 90000, imagen: "../medios/vinilo.jfif" },
    { id: 4, nombre: "Buzo Oversize", precio: 150000, imagen: "../medios/buzo.png" },
    { id: 5, nombre: "Stickers", precio: 3000, imagen: "../medios/stickers.jpg" },
    { id: 6, nombre: "Vinilo", precio: 50000, imagen: "../medios/disquito.jfif" },
    { id: 7, nombre: "Funko Pop", precio: 65000, imagen: "../medios/funko.jfif" },
    { id: 8, nombre: "Gorra OITM", precio: 30000, imagen: "../medios/gorrita.jfif" },
];

// carrito inicio desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// elementos DOM
const productosContainer = document.getElementById("productosContainer");
const carritoLista = document.getElementById("carritoLista");
const totalTexto = document.getElementById("total");

// para ver los productos en el HTML
function mostrarProductos() {
    productosContainer.innerHTML = "";
    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        `;
    productosContainer.appendChild(div);
    });
}
function agregarAlCarrito(id) {
    const producto = productos.find((p) => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
}
function actualizarCarrito() {
    carritoLista.innerHTML = "";
    let total = 0;

    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        carritoLista.appendChild(li);
        total += producto.precio;
    });

    totalTexto.textContent = `Total: $${total}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
mostrarProductos();
actualizarCarrito();

// vaciar carrito
document.getElementById("vaciarCarritoBtn").addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

