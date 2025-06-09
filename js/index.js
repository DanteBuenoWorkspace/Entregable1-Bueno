let salir = 2

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
]

// Carrito vacío al inicio
const carrito = [

]

alert("Bienvenido a finesse")

do {

    let eleccion = parseInt(prompt("1-ver catalogo \n2-ver carrito \n3-informacion sobre envios \n4-finalizar compra"))

    while (eleccion < 1 || eleccion > 4 || isNaN(eleccion)) {
        eleccion = parseInt(prompt("Ingrese una eleccion valida \n1-ver catalogo \n2-ver carrito \n3-informacion sobre envios \n4-finalizar compra"))
    }

    switch (eleccion) {
        case 1:
            // Mostrar catálogo y permitir agregar relojes al carrito
            let seguirSeleccionando = true;
            imprimirCatalogo(catalogo);

            do {
                let seleccion = seleccionarReloj(catalogo);
                añadirAlCarrito(seleccion);

                seguirSeleccionando = confirm("¿Querés agregar otro reloj al carrito?");
            } while (seguirSeleccionando);

            break;
        case 2:
            // Mostrar carrito
            mostrarCarrito()

            break;

        case 3:
            // Mostrar info de envíos
            alert("📦 Información sobre envíos\n\nRealizamos envíos a todo el país con entrega segura y seguimiento en tiempo real.\nTodos nuestros productos están asegurados y llegan en un plazo estimado de 3 a 5 días hábiles.");

            break;


        case 4:
            // Finalizar compra si hay productos en el carrito
            if (carrito.length == 0) {
                alert("No hay productos en el carrito para finalizar la compra.");
                break;
            }

            salir = parseInt(prompt("¿Desea finalizar la compra? \n\n 1 - si \n 2 - no"))

            while (salir < 1 || salir > 2 || isNaN(salir)) {
                salir = parseInt(prompt("Ingrese una eleccion valida \n ¿Desea finalizar la compra? \n\n 1 - si \n 2 - no"))
            }

            if (salir == 1) {
                alert("Compra finalizada")
                mostrarCarrito(carrito)
            }

            break;
    }

} while (salir == 2);

// Función para mostrar el catálogo
function imprimirCatalogo(catalogo) {
    let mensaje = ("Catálogo de productos: \n\n");

    for (let i = 0; i < catalogo.length; i++) {

        mensaje += "Nombre: " + catalogo[i].nombre +
            "\nPrecio: $" + catalogo[i].precio +
            "\nColor: " + catalogo[i].color + "\n\n"

    }

    alert(mensaje);
}

// Función para que el usuario seleccione un reloj
function seleccionarReloj(catalogo) {
    let mensaje = "Selecciona un reloj: \n\n";

    for (let i = 0; i < catalogo.length; i++) {
        mensaje += (i + 1) + " - " + catalogo[i].nombre + "\n";
    }

    let eleccion = parseInt(prompt(mensaje));

    while (eleccion < 1 || eleccion > catalogo.length || isNaN(eleccion)) {
        eleccion = parseInt(prompt("Selección inválida. Por favor, selecciona un número válido: \n\n" + mensaje));
    }

    let relojSeleccionado = catalogo[eleccion - 1];

    alert("Seleccionaste:\n\n" +
        "Nombre: " + relojSeleccionado.nombre +
        "\nPrecio: $" + relojSeleccionado.precio +
        "\nColor: " + relojSeleccionado.color);

    return eleccion
}

// Función para añadir reloj al carrito
function añadirAlCarrito(seleccion) {
    carrito.push(catalogo[seleccion - 1])
    alert("Reloj añadido al carrito.")
}

// Función para mostrar el carrito y total a pagar
function mostrarCarrito() {

    if (carrito.length == 0) {
        alert("El carrito esta vacio")
        return
    }

    let mensaje = "Carrito de compras \n\n"
    let total = 0

    for (let i = 0; i < carrito.length; i++) {
        mensaje += (i + 1) + ". " + carrito[i].nombre + " - $" + carrito[i].precio + " - color: " + carrito[i].color + "\n"
        total += carrito[i].precio
    }

    mensaje += "\nTotal a pagar: $" + total
    alert(mensaje)
}