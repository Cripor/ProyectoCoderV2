//const filtros = document.querySelectorAll(".inner-prod-width");
const template = document.getElementById("template-card").content;
const cards = document.getElementById("cards");
let contenedorFiltros = document.getElementById("cardsFiltradas");
const fragment = document.createDocumentFragment();
const button = template.querySelector('#temp-button')
let buttonLink = template.querySelector('#linkBtn')
const mouses = document.querySelector(".mouse");
const auriculares = document.querySelector(".auriculares");
const teclados = document.querySelector(".teclados");
const pads = document.querySelector(".pads");
const cams = document.querySelector(".cams-mics");
const modems = document.querySelector(".modems");
const pendrives = document.querySelector(".pendrives");
const joysticks = document.querySelector(".joysticks");
const complementos = document.querySelector(".complementos");
const auriculares2 = document.querySelector(".auriculares2");
const fundas = document.querySelector(".fundas");
const camsCons = document.querySelector(".camaras-mics");
const memoria = document.querySelector(".memoria");
const suscripcion = document.querySelector(".btn-primary");

suscripcion.addEventListener("click", (e) => {
    let res = prompt("Ingrese su correo electrónico");
    if (res != "") {
        alert("¡Felicidades! Se ha suscrito a nuestras novedades satisfactoriamente")
    } else {
        while (res == "") {
            let res = prompt("Ingrese su correo electrónico")
            if (res != ""){
                alert("¡Felicidades! Se ha suscrito a nuestras novedades satisfactoriamente")
                break
            }
        }
    }
    e.stopImmediatePropagation()
})

mouses.addEventListener("click", (e) => {
    cards.innerHTML = ''
    fetchData("Mouse")
    e.stopImmediatePropagation()
})

auriculares.addEventListener("click", (e) => {
    cards.innerHTML = ''
    fetchData("Auriculares")
    e.stopImmediatePropagation()
})

teclados.addEventListener("click", (e) => {
    cards.innerHTML = ''
    fetchData("Teclado")
    e.stopImmediatePropagation()
})

pads.addEventListener("click", (e) => {
    cards.innerHTML = ''
    fetchData("Pad")
    e.stopImmediatePropagation()
})

cams.addEventListener("click", (e) => {
    cards.innerHTML = ''
    fetchData("Webcam")
    e.stopImmediatePropagation()
})

modems.addEventListener("click", (e) => {
    cards.innerHTML = ''
    fetchData("Router")
    e.stopImmediatePropagation()
})

pendrives.addEventListener("click", (e) => {
    cards.innerHTML = ''
    fetchData("Pendrive")
    e.stopImmediatePropagation()
})

joysticks.addEventListener("click", (e) => {
    cards.innerHTML = ''
    fetchData("Joystick")
    e.stopImmediatePropagation()
})

complementos.addEventListener("click", (e) => {
        cards.innerHTML = '<h3>¡Vaya! aún no hay productos para mostrar en esta categoría</h3>'
    fetchData("Complemento")
    e.stopImmediatePropagation()
})

auriculares2.addEventListener("click", (e) => {
    cards.innerHTML = ''
    fetchData("Auriculares")
    e.stopImmediatePropagation()
})

fundas.addEventListener("click", (e) => {
    cards.innerHTML = ''
    fetchData("Funda")
    e.stopImmediatePropagation()
})

camsCons.addEventListener("click", (e) => {
    cards.innerHTML = ''
    fetchData("Cámara")
    e.stopImmediatePropagation()
})

memoria.addEventListener("click", (e) => {
    cards.innerHTML = ''
    fetchData("Memoria")
    e.stopImmediatePropagation()
})


const fetchData = async (variable) => {
    try {
    const res = await fetch('js/products.json');
    const data = await res.json();
    mostrarCards(data.filter(element => element.nombre.includes(variable)));
    } catch (error){
        console.log(error);
    }
}

const mostrarCards = data => {
    data.forEach(producto => {
        if (cards.innerText.includes(producto.nombre) == false) {
        template.querySelector('#temp-title').textContent = producto.nombre;
        template.querySelector('#temp-p').textContent = producto.precio;
        template.querySelector('#temp-img').setAttribute( 'src', producto.img );
        template.querySelector('#temp-button').dataset.id = producto.id;
        if (producto.nombre.includes("Pad")) {
            template.querySelector('#linkBtn').setAttribute( 'href', "../productos-pages/pads.html");
        } else if (producto.nombre.includes("Mouse")) {
            template.querySelector('#linkBtn').setAttribute( 'href', "../productos-pages/mouses.html");
        } else if (producto.nombre.includes("Teclado")) {
            template.querySelector('#linkBtn').setAttribute( 'href', "../productos-pages/teclados.html");
        } else if (producto.nombre.includes("Auriculares")) {
            template.querySelector('#linkBtn').setAttribute( 'href', "../productos-pages/auriculares.html");
        } else if (producto.nombre.includes("Micrófono") || producto.nombre.includes("Webcam")) {
            template.querySelector('#linkBtn').setAttribute( 'href', "../productos-pages/cams.html");
        } else if (producto.nombre.includes("Pendrive")) {
            template.querySelector('#linkBtn').setAttribute( 'href', "../productos-pages/pendrives.html");
        } else if (producto.nombre.includes("Router")) {
            template.querySelector('#linkBtn').setAttribute( 'href', "../productos-pages/modems.html");
        } else if (producto.nombre.includes("Joystick")) {
            template.querySelector('#linkBtn').setAttribute( 'href', "../productos-pages/joysticks.html");
        } else if (producto.nombre.includes("Funda")) {
            template.querySelector('#linkBtn').setAttribute( 'href', "../productos-pages/fundas.html");
        } else if (producto.nombre.includes("Cámara")) {
            template.querySelector('#linkBtn').setAttribute( 'href', "../productos-pages/cams-cons.html");
        } else if (producto.nombre.includes("Memoria")) {
            template.querySelector('#linkBtn').setAttribute( 'href', "../productos-pages/memorias.html");
        }
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
        }
    })
    cards.appendChild(fragment)
}

//console.log(filtros);