const productos = [
    { id: 1, nombre: "Camiseta Oversize Black", precio: 29.99, cat: "Hombres", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400" },
    { id: 2, nombre: "Top Silk White", precio: 24.99, cat: "Mujeres", img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=400" },
    { id: 3, nombre: "Sudadera Urban Grey", precio: 45.00, cat: "Hombres", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400" },
    { id: 4, nombre: "Vestido Gala Red", precio: 89.99, cat: "Mujeres", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400" },
    { id: 5, nombre: "Chaqueta Denim", precio: 55.00, cat: "Hombres", img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=400" },
    { id: 6, nombre: "Cartera Minimal", precio: 35.00, cat: "Mujeres", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400" }
];

let carritoCount = 0;

function mostrarProductos(lista = productos) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = "";

    lista.forEach(p => {
        const div = document.createElement('div');
        div.classList.add('product-item');
        div.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p style="color: grey; font-size: 0.8rem">${p.cat}</p>
            <p class="price">$${p.precio}</p>
            <button class="btn-add" onclick="agregar(event)">Añadir al carrito</button>
        `;
        contenedor.appendChild(div);
    });
}

function filtrarProductos(categoria) {
    if(categoria === 'Todos') {
        mostrarProductos(productos);
    } else {
        const filtrados = productos.filter(p => p.cat === categoria);
        mostrarProductos(filtrados);
    }
}

function agregar() {
    carritoCount++;
    document.getElementById('cart-count').innerText = `🛒 ${carritoCount}`;
}

// Iniciar
document.addEventListener('DOMContentLoaded', () => mostrarProductos());

function agregar(event) {
    // 1. Obtener el botón y el elemento del producto
    const boton = event.target;
    const productoCard = boton.closest('.product-item');
    const imagenProducto = productoCard.querySelector('img');
    const carritoIcono = document.getElementById('cart-count');

    // 2. Crear el carrito volador
    const flyer = document.createElement('div');
    flyer.innerText = "🛒";
    flyer.className = 'flying-cart';
    document.body.appendChild(flyer);

    // 3. Posición inicial (donde está el botón)
    const rectBoton = boton.getBoundingClientRect();
    flyer.style.left = `${rectBoton.left}px`;
    flyer.style.top = `${rectBoton.top}px`;
    flyer.style.opacity = "1";

    // 4. Posición final (donde está el icono del carrito en el nav)
    const rectCarrito = carritoIcono.getBoundingClientRect();

    // 5. Pequeño efecto visual en la ropa
    productoCard.classList.add('buying');
    setTimeout(() => productoCard.classList.remove('buying'), 600);

    // 6. Animación hacia el carrito del nav
    setTimeout(() => {
        flyer.style.left = `${rectCarrito.left}px`;
        flyer.style.top = `${rectCarrito.top}px`;
        flyer.style.transform = "scale(0.5) rotate(15deg)";
    }, 10);

    // 7. Limpieza y actualización del contador
    setTimeout(() => {
        flyer.remove();
        carritoCount++;
        carritoIcono.innerText = `🛒 ${carritoCount}`;
        // Feedback visual en el contador
        carritoIcono.style.transform = "scale(1.3)";
        setTimeout(() => carritoIcono.style.transform = "scale(1)", 200);
    }, 800);
}

function buscarProducto() {
    // 1. Obtener el texto del buscador y pasarlo a minúsculas
    const texto = document.getElementById('busqueda').value.toLowerCase();
    
    // 2. Filtrar el array de productos original
    const filtrados = productos.filter(p => {
        const nombre = p.nombre.toLowerCase();
        const categoria = p.cat.toLowerCase();
        
        // Verifica si el texto está en el nombre o en la categoría
        return nombre.includes(texto) || categoria.includes(texto);
    });

    // 3. Volver a dibujar los productos con el resultado del filtro
    mostrarProductos(filtrados);

    // 4. Mensaje si no hay resultados
    const contenedor = document.getElementById('contenedor-productos');
    if (filtrados.length === 0) {
        contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">
            No encontramos prendas que coincidan con "${texto}" 😅</p>`;
    }
}

