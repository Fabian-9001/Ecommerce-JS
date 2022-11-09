/*-- BASE DE DATOS --*/
const data = [
    {
        ID: 1,
        IMG: './img/img__articles/monitor1.2.jpg',
        Category: 'Monitores',
        Name: 'LG UltraGear 32″ – 1ms – 144Hz – 3840×2160',
        Unity: 10,
        Price: 190000,
    },
    {
        ID: 2,
        IMG: './img/img__articles/monitor2.jpg',
        Category: 'Monitores',
        Name: 'Asus 27″ RGB 1ms – 165Hz – 2560×1440',
        Unity: 10,
        Price: 180000,
    },
    {
        ID: 3,
        IMG: './img/img__articles/monitor3.2.webp',
        Category: 'Monitores',
        Name: 'GIGABYTE 32″ M32U-SA IPS 1MS -144HZ – 3840×2160',
        Unity: 10,
        Price: 150000,
    },
    {
        ID: 4,
        IMG: './img/img__articles/monitor4.jpg',
        Category: 'Monitores',
        Name: 'Acer Predator 32″ RGB 1ms – 144Hz – 3840×2160',
        Unity: 10,
        Price: 250000,
    },
    {
        ID: 5,
        IMG: './img/img__articles/monitor5.2.jpg',
        Category: 'Monitores',
        Name: 'MSI Optix G24C Curvo 24″ – 1ms – 144Hz – 1920×1080',
        Unity: 10,
        Price: 130000,
    },


]


/*-- Articulos --*/

const containerArticles = document.getElementById('containerArticles')
const cartContainer = document.getElementById('cartContainer')

function printArticles() {
    let html = ''
    data.map(article => (
        html +=
        `<article class="article">
        <header class="article__header">
            <img class="img" src=${article.IMG} alt="">
        </header>

        <div class="article__body">
            <p class="category">${article.Category}</p>
            <h3 class="article__name">${article.Name}</h3>
        </div>

        <footer class="article__footer">
            <button id='${article.ID}' class="button">
                <svg class="Bag__SVG" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                    <path
                        d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
                AGREGAR
            </button>
            <p class="precio">${article.Price}</p>
        </footer>
</article>`
    ))
    containerArticles.innerHTML += html

}
printArticles()



/*-- CARRITO --*/
let Cart = []

/*-- AGREGAR --*/
function addToCart(ID) {

    const Quantity = 1

    /*-- FUNCION QUE VERIFICA EL ID DEL PRODUCTO AGREGADO EN LA BASE DE DATOS CON EL ARTICULO QUE TENGA EL MISMO ID --*/
    let articleFound = data.find(article => article.ID === ID)

    /*-- FUNCION QUE VERIFICA Y TRAE UN PRODUCTO YA AGREGADO AL CARRITO  --*/
    let articleRepeat = Cart.find(article => article.ID === ID)

    /*-- PRIMER IF VERIFICA SI EN LA BASE DE DATOS EL PRODUCTO SE ENCUENTRA DISPONIBLE --*/
    if (articleFound && articleFound.Unity > 0) {

        /*-- SEGUNDO IF VERIFICA LO QUE TIENE QUE HACER SI EL PRODUCTO YA SE ENCONTRABA EN EL CARRITO
        Y LO QUE HARA SI SE AGREGA POR PRIMERA POR PRIMERA VEZ --*/
        if (articleRepeat) {

            /*-- TERCER IF VERIFICA EL STOCK DEL PRODUCTO EN LA BASE DE DATOS,
            VERIFICA LO QUE HARA EN CASO DE SUPERAR O NO EL LIMITE --*/
            if (articleFound.Unity < Quantity + articleRepeat.Quantity) {
                window.alert("no hay en stock")
            } else {
                articleRepeat.Quantity++
            }
        } else {
            Cart.push({ ID, Quantity })
            console.log(Cart)
        }
    }
    else {
        window.alert('No hay Disponibles')
    }
}

/*-- QUITAR --*/

/*-- FUNCION QUE VERIFICA LA CANTIDAD DE PRODUCTOS AGREGADOS Y REMOVERLOS DE 1 EN 1 AL LLMAR
LA FUNCCION  --*/
function removeOfCart(ID) {
    const Quantity = 1
    let articleRepeat = Cart.find(article => article.ID === ID)

    /*-- SI AL QUITAR 1 UNIDAD AL PRODUCTO ES MAYOR QUE 0 SIGNIFICA QUE AUN EXISTE --*/
    if (articleRepeat.Quantity - 1 > 0) {
        articleRepeat.Quantity -= 1
    }
    /*-- SI ES IGUAL A 0 AL RESTAR LA UNIDAD, SE ELIMINARA Y SE DEJARAN LOS QUE SEAN MAYORES A ESTE --*/
    else {
        Cart = Cart.filter(article => article.ID !== ID)
    }
}

/*-- FUNCION QUE CALCULA EL PRECIO TOTAL --*/
function totalPrice() {
    let html = ''
    let sum = 0

    for (let product of Cart) {
        let articleFound = data.find(article => article.ID === product.ID)
        sum += product.Quantity * articleFound.Price
    }
    return sum
}

/*-- FUNCION DE COMPRAR --*/
function buy() {
    for (let product of Cart) {
        let articleFound = data.find(article => article.ID === product.ID)
        articleFound.Unity -= product.Quantity
    }
    /*--window.alert--*/
    Cart = []
}



/*-- COMPRAS --*/


const article = document.querySelectorAll('.article')
for (let ID of article) {
    ID.addEventListener('click', e => {
        if (+e.target.id) {
            addToCart(+e.target.id)
            totalPrice()
        }
    })
}


/*-- QUITAR COMPRA --*/

/*-- CARRITO --*/


/*--PINTAR PRODUCTOS DE CARRITO--*/

const productosEnCart = document.getElementById('container__products')
const pintarEnCarrito = productUo => {

    for (let producto of Cart) {
        
        let productoData = data.find(productUo => productUo.ID === producto.ID)
        let html = '<ul>'
        html +=
            `
        <li>
        <img src="${productoData.IMG}" alt="">
        <h3>${productoData.Name}</h3>
        <p>$${productoData.Price}</p>
        <button id='${productoData.ID}' class='remove__btn'>Remove</button>
        </li>
        `
        html += '</ul>'
        productosEnCart.innerHTML += html
    }    
}

pintarEnCarrito()


/*-- ABRIR MENU DE CARRITO --*/
const callCart = document.getElementById('callCart')

callCart.addEventListener('click', () => {
    cartContainer.classList.toggle('Active')
})

/*-- CERRAR MENU DE CARRITO --*/
const closeCart = document.getElementById('btnClose')

closeCart.addEventListener('click', () => {
    cartContainer.classList.toggle('Active')
})


/*-- Primer Menu --*/
const firstMenu = document.getElementById('first__menu')
const firstClose = document.getElementById('first__disable')
const firstOpen = document.getElementById('first__open')


firstOpen.addEventListener('click', () => {
    firstMenu.classList.toggle('header__nav--active')
})

firstClose.addEventListener('click', () => {
    firstMenu.classList.toggle('header__nav--active')
})

/*-- Segundo Menu --*/
const secondMenu = document.getElementById('second__menu')
const secondOpen = document.getElementById('second__open')

secondOpen.addEventListener('click', () => {
    secondMenu.classList.toggle('subContainer3__nav--active')
})



