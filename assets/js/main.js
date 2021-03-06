"use strict"

const items = [{
        id: 1,
        name: 'Hoodies',
        price: 14.00,
        image: 'https://academlo-store.netlify.app/assets/img/featured1.png',
        category: 'hoodies',
        quantity: 10
    },
    {
        id: 2,
        name: 'Shirts',
        price: 24.00,
        image: 'https://academlo-store.netlify.app/assets/img/featured2.png',
        category: 'shirts',
        quantity: 15
    },
    {
        id: 3,
        name: 'Sweatshirts',
        price: 24.00,
        image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
        category: 'sweatshirts',
        quantity: 20
    },
    {
        id: 4,
        name: 'Sweatshirts',
        price: 30.00,
        image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
        category: 'sweatshirts',
        quantity: 10
    }
]

let cartIcon = document.querySelector(".cart")
let cartOverlay = document.querySelector(".shopping-cart-overlay")
let cartClose = document.getElementById("cart-close")
let listProducts = document.querySelector(".products")
let cartContainer = document.querySelector(".cart-list")
let cartCount = document.querySelector("#cart-count")
let cart = []





/* Guardando info con reseteo de página */

function resetWeb(){
    if( JSON.parse( window.localStorage.getItem("contador")) !== null){
        cart = JSON.parse( window.localStorage.getItem("contador") )
    }else{
        window.localStorage.setItem('contador', [])
    }
    
    mostrarProductosCart()
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos()
    resetWeb()
})

cartIcon.addEventListener("click", () => {
    cartOverlay.classList.add("mostrar")
})

cartClose.addEventListener("click", () => {
    cartOverlay.classList.remove("mostrar")
})


/* nav en el scroll */

let header = document.querySelector("header")

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        header.classList.add("scroll-header")
    } else {
        header.classList.remove("scroll-header")
    }
})


/*cambiando a dark-mode */
let themeIcon = document.getElementById("theme-toggler")

let body = document.querySelector("body")

themeIcon.addEventListener("click", (e) => {
    body.classList.toggle("dark-theme")
    
    let isDark = body.classList.contains("dark-theme")
    
    if(isDark){
        themeIcon.classList.replace("bx-moon", "bx-sun")
    }else{
        themeIcon.classList.replace("bx-sun", "bx-moon")
    }

    // e.preventDefault()

})


/* -- Desde aqui se puede visualizar el codigo para agregar los productos al carro de compras */
function mostrarProductos() {
    let fragmentHTML = ""

    items.forEach((product) => {
        fragmentHTML += `
        <div class="card">
            <div class="imagen">
                 <img src=${product.image}>
            </div>
            <button data-id="${product.id}" class="buy-button"><i class='bx bx-plus-circle bx-md'></i></button>
            <div class="info-card">
                <h4>$${product.price} |</h4>
                <p>stock:${product.quantity}</p>
                <h4>${product.name}</h4>
            </div>
        </div>
        `
            /*<div class="product-card">
                <div class="product-image-container">
                    <img src=${product.image} alt="" class="product-img">
                </div>
                <p>$${product.price}</p>
                <button data-id="${product.id}" class="product-button">
                    <i class='bx bx-plus-circle bx-md'></i>
                </button>
            </div>*/
    })

    listProducts.innerHTML = fragmentHTML


    let productsButton = document.querySelectorAll(".buy-button")


    productsButton.forEach((button) => {
        button.addEventListener("click", (evento) => {
            let id = parseInt(button.getAttribute("data-id"))
            let product = items.find(item => {
                return item.id === id
            })


            //cart.push( product )
            //console.log((cart))
            agregarProducto(product)

        })
    })
}


function agregarProducto(producto) {

    let resultadoFind = cart.find(item => item.id === producto.id)
    let cartCount = document.querySelector(".cart-count")
    cartCount.textContent++;

    if (resultadoFind) {
        let stoc = cart[resultadoFind.index].quantity
        let quantitySelected = cart[resultadoFind.index].quantitySelected


        if (stoc > quantitySelected) {
            cart[resultadoFind.index].quantitySelected += 1

        } else {
            alert("No tenemos suficiente inventario")
        }

    } else {
        producto.quantitySelected = 1
        producto.index = cart.length


        cart.push(producto)
    }

    window.localStorage.setItem( "contador", JSON.stringify(cart))
    console.log(cart)
    mostrarProductosCart()
}
/*
function mostrarProductosCart() {
    let fragmentoHTML = ``

    cart.forEach(item => {
        fragmentoHTML += `
            <div class="item">
                <img src=${item.image} alt="">
                <p>${item.name}</p>
                <small>Cantidad: ${item.quantitySelected}</small>
            </div>
        `
    })

    cartContainer.innerHTML = fragmentoHTML

}
*/
function mostrarProductosCart(){

    let fragmentoHTML = ``
    let suma = 0
    let cantidadTotal = 0

    cart.forEach( item =>{
        fragmentoHTML += `
        <div class="cart-item">
            <img src="${item.image}" alt="">
            <p>${item.name}</p>
            <small>Cantidad: ${item.quantitySelected}</small>
            <div class="agregar-productos">
                <button class="sumar-producto" id="btn-sumar"> + </button>
                <button class="restar-producto" id="btn-restar"> - </button>
            </div>
        </div>
        `


        let totalProducto = item.quantitySelected * item.price
        suma += totalProducto

        cantidadTotal += item.quantitySelected
    })

    fragmentoHTML += `
        <div class="info-carrito">
            <div class="cart-price">
                <p>Productos seleccionados ${cantidadTotal}</p>
            </div>
            <div>
                <p>Total a pagar: $${suma}</p>
            </div>
            <div class="btn-pago">
                <a href="./assets/images/meme2.jpg" target="_blank">
                <button class="btn-pointer"><span class="btn-font-size"><i class='bx bxs-check-shield'></i> Checkout</span></button>
                </a>
            </div>
        </div>
        `
        
        cartContainer.innerHTML = fragmentoHTML
        cartCount.textContent = cantidadTotal
    }
    
    
    // <a href="./assets/images/meme2.jpg" target="_blank">

    //         </a>

    // onclick="location.href='./assets/images/meme2.jpg'"



