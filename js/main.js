const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const template = document.getElementById("template-card").content;
const templateFooter =  document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment()
let cart = {}

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
    if(localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        mostrarCart();
    }
});

cards.addEventListener("click", e => {
    addToCart(e)
    Swal.fire('Producto añadido al carrito')
});

items.addEventListener('click', e => {
    btnAccion(e)
})

const fetchData = async () => {
    try {
    const res = await fetch('js/products.json');
    const data = await res.json();
    //console.log(data)
    mostrarCards(data);
    } catch (error){
        console.log(error);
    }
}

//Mostrar productos:
const mostrarCards = data => {
    //console.log(data)
    data.forEach(producto => {
        //console.log(producto);
        template.querySelector('#temp-title').textContent = producto.nombre;
        template.querySelector('#temp-p').textContent = producto.precio;
        template.querySelector('#temp-img').setAttribute( 'src', producto.img );
        template.querySelector('#temp-button').dataset.id = producto.id;
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addToCart = e => {

    if (e.target.classList.contains("btn-dark")) {
        setCart(e.target.parentElement)
    };
    e.stopPropagation();
}

const setCart = object => {
    const product = {
        id: object.querySelector('.btn-dark').dataset.id,
        name: object.querySelector('#temp-title').textContent,
        price: object.querySelector('#temp-p').textContent,
        img: object.querySelector('#temp-img').innerHTML,
        quantity: 1,
    }

    if(cart.hasOwnProperty(product.id)) {
        product.quantity = cart[product.id].quantity + 1
    }

    cart[product.id] = {...product}
    mostrarCart()
};

const mostrarCart = () => {
    console.log(cart);
    items.innerHTML = ''
    Object.values(cart).forEach(product => {
        templateCarrito.querySelector("th").textContent = product.id;
        templateCarrito.querySelectorAll("td")[0].textContent = product.name;
        templateCarrito.querySelectorAll("td")[1].textContent = product.quantity;
        templateCarrito.querySelector(".btn-info").dataset.id = product.id;
        templateCarrito.querySelector(".btn-danger").dataset.id = product.id;
        templateCarrito.querySelector("#totalCarrito").textContent = product.quantity * product.price;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment)

    mostrarFooter()

    localStorage.setItem('cart', JSON.stringify(cart));
}

const mostrarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(cart).lenght === 0) {
        footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>';
        return
    }

    const totalCantidad = Object.values(cart).reduce((acc, {quantity}) => acc + quantity,0);
    const totalPrecio = Object.values(cart).reduce((acc, {quantity, price}) => acc + quantity * price,0);

    templateFooter.querySelectorAll('td')[0].textContent = totalCantidad
    templateFooter.querySelector('#totalPrice').textContent = totalPrecio

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const vaciar = document.getElementById('vaciar-carrito');
    vaciar.addEventListener('click', () => {
        cart = {};
        mostrarCart();
        Swal.fire('El carrito ha sido vaciado')
    })
}


const btnAccion = e => {
    //Aumentar
    if(e.target.classList.contains('btn-info')) {
        const producto = cart[e.target.dataset.id];
        producto.quantity++;
        cart[e.target.dataset.id] = {...producto};
        mostrarCart();
        }
    //disminuir
    if(e.target.classList.contains('btn-danger')) {
        const producto = cart[e.target.dataset.id];
        producto.quantity--;
        if ( producto.quantity == 0) {
            delete cart[e.target.dataset.id]
        }
    }
        mostrarCart();
    e.stopPropagation()
}

$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
});