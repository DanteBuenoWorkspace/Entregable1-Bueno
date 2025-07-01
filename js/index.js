// Lista de relojes disponibles
const catalogo = [
    {
        nombre: "Patek Philippe Nautilus",
        precio: 12500,
        color: "negro y dorado"
    },
    {
        nombre: "Cartier Santos",
        precio: 8300,
        color: "negro y plateado"
    },
    {
        nombre: "Rolex Submariner",
        precio: 9500,
        color: "negro"
    },
    {
        nombre: "Omega Seamaster",
        precio: 7200,
        color: "negro y blanco"
    },
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || []

const catalogoDom = document.getElementById('catalogo')
const carritoDom = document.getElementById('carritoLista')
const totalDom = document.getElementById('total')
const btnFinalizar = document.getElementById('finalizar')
const mensajeDom = document.getElementById('mensaje')

function mostrarCatalogo() {
    const lista = catalogo.map((producto, index) => {
        return `
            <li>
                <div>
                    <strong>${producto.nombre}</strong> - $${producto.precio} - ${producto.color}
                </div>
                <button data-index="${index}">Agregar al carrito</button>
            </li>
        `
    }).join('')

    catalogoDom.innerHTML = `
        <h2>Catálogo de relojes</h2>
        <ul>${lista}</ul>
    `

    const botones = catalogoDom.querySelectorAll('button')

    botones.forEach(boton => {
        boton.addEventListener('click', evento => {
            const index = evento.target.getAttribute('data-index')
            agregarAlCarrito(index)
        })
    })
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        carritoDom.innerHTML = `<li>El carrito está vacío</li>`
        totalDom.textContent = `Total = $0`
        return
    }

    let total = 0

    carritoDom.innerHTML = carrito.map((producto, index) => {
        total += producto.precio
        return `
            <li>
                ${producto.nombre} - $${producto.precio} - ${producto.color}
                <button data-index="${index}" class="btn-eliminar">Eliminar</button>
            </li>
        `
    }).join('')

    totalDom.textContent = `Total = $${total}`

    const btnEliminar = carritoDom.querySelectorAll('.btn-eliminar')
    btnEliminar.forEach(btn => {
        btn.addEventListener('click', evento => {
            const idx = evento.target.getAttribute('data-index')
            eliminarDelCarrito(idx)
        })
    })
}

function agregarAlCarrito(index) {
    carrito.push(catalogo[index])
    localStorage.setItem('carrito', JSON.stringify(carrito))
    mostrarCarrito()
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    mostrarCarrito()
}

btnFinalizar.addEventListener('click', () => {
    mensajeDom.style.textAlign = "center"
    if (carrito.length === 0) {
        mensajeDom.style.color = "#f8d7da"
        mensajeDom.textContent = 'No hay productos en el carrito.'
    } else {
        const totalCompra = carrito.reduce((acum, p) => acum + p.precio, 0)
        mensajeDom.style.color = "#d4edda"
        mensajeDom.textContent = `Compra finalizada. Total a pagar: $${totalCompra}`
        carrito = []
        localStorage.removeItem('carrito')
        mostrarCarrito()
    }
});

mostrarCatalogo()
mostrarCarrito()
