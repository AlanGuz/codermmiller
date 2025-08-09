
let productos = [];
let carritoProductos = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos DOM
const productosContainer = document.getElementById("productosContainer");
const carritoLista = document.getElementById("carritoLista");
const totalTexto = document.getElementById("total");
const vaciarCarritoBtn = document.getElementById("vaciarCarritoBtn");

//DOM carrito 
const carritoSection = document.getElementById('carrito');

// botón flotante
const abrirCarritoBtn = document.getElementById('abrirCarritoBtn');

const cerrarCarritoBtn = document.createElement('button');
cerrarCarritoBtn.id = 'cerrarCarritoBtn';
cerrarCarritoBtn.innerHTML = '&times;';
carritoSection.insertBefore(cerrarCarritoBtn, carritoSection.firstChild);

// Cargar productos desde JSON
function cargarProductos() {
    fetch('../productos.json')
        .then(res => res.json())
        .then(data => {
            productos = data;
            mostrarProductos(productos);
            actualizarCarrito();
        })
        .catch(err => {
            console.error('Error cargando productos:', err);
            Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
        });
}

// Mostrar productos 
function mostrarProductos(arr) {
    productosContainer.innerHTML = "";
    arr.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}" />
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio}</p>
            <button class="btn-agregar" data-id="${prod.id}">Agregar</button>
        `;
        productosContainer.appendChild(div);
    });

    const botones = document.querySelectorAll(".btn-agregar");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = parseInt(boton.getAttribute("data-id"));
            agregarAlCarrito(id);
        });
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const productoEnCarrito = carritoProductos.find(p => p.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carritoProductos.push({...producto, cantidad: 1});
    }

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${producto.nombre} agregado al carrito`,
        showConfirmButton: false,
        timer: 1000,
        toast: true
    });

    actualizarCarrito();
}

// Mostrar carrito 
function actualizarCarrito() {
    carritoLista.innerHTML = "";
    let total = 0;

    carritoProductos.forEach(prod => {
        const li = document.createElement("li");
        li.textContent = `${prod.nombre} x${prod.cantidad} - $${prod.precio * prod.cantidad}`;

        //  eliminar un producto
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.style.marginLeft = "10px";
        btnEliminar.addEventListener("click", () => {
            eliminarDelCarrito(prod.id);
        });
        li.appendChild(btnEliminar);

        carritoLista.appendChild(li);

        total += prod.precio * prod.cantidad;
    });

    totalTexto.textContent = `Total: $${total}`;
    localStorage.setItem("carrito", JSON.stringify(carritoProductos));
}


function eliminarDelCarrito(id) {
    carritoProductos = carritoProductos.filter(prod => prod.id !== id);
    actualizarCarrito();
    Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Producto eliminado del carrito',
        showConfirmButton: false,
        timer: 1000,
        toast: true
        });
}

// Vaciar carrito
vaciarCarritoBtn.addEventListener("click", () => {
    carritoProductos = [];
    actualizarCarrito();
    Swal.fire({
        icon: 'warning',
        title: 'Carrito vaciado',
        timer: 1000,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
    });
});

//  carrito desplegable
abrirCarritoBtn.addEventListener('click', () => {
    carritoSection.classList.add('activo');
});

cerrarCarritoBtn.addEventListener('click', () => {
    carritoSection.classList.remove('activo');
});

cargarProductos();
actualizarCarrito();

abrirCarritoBtn.addEventListener('click', () => {
    carritoSection.classList.add('activo');
    abrirCarritoBtn.style.display = 'none';  // Oculta el botón al abrir carrito
});

cerrarCarritoBtn.addEventListener('click', () => {
    carritoSection.classList.remove('activo');
    abrirCarritoBtn.style.display = 'block'; // Muestra el botón al cerrar carrito
});
