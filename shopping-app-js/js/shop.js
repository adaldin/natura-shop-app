
var products = [{
    id: 1,
    name: 'Cooking oil',
    price: 10.5,
    type: 'grocery',
    offer: {
        number: 3,
        percent: 20
    }
},
{
    id: 2,
    name: 'Pasta',
    price: 6.25,
    type: 'grocery'
},
{
    id: 3,
    name: 'Instant cupcake mixture',
    price: 5,
    type: 'grocery',
    offer: {
        number: 10,
        percent: 30
    }
},
{
    id: 4,
    name: 'All-in-one',
    price: 260,
    type: 'beauty'
},
{
    id: 5,
    name: 'Zero Make-up Kit',
    price: 20.5,
    type: 'beauty'
},
{
    id: 6,
    name: 'Lip Tints',
    price: 12.75,
    type: 'beauty'
},
{
    id: 7,
    name: 'Lawn Dress',
    price: 15,
    type: 'clothes'
},
{
    id: 8,
    name: 'Lawn-Chiffon Combo',
    price: 19.99,
    type: 'clothes'
},
{
    id: 9,
    name: 'Toddler Frock',
    price: 9.99,
    type: 'clothes'
}
];


// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

var badgeCart = document.getElementById('count_product');

var modalTittle = document.getElementById('modal__cart--title');

// Exercise 1
/* function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array

    A- loop version
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            cartList.push(products[i]);
        }
    }

    //Bb- while version
    let i = 0;
    let founded = false;
    while (i < products.length && !founded) {
        if (products[i].id === id) {
            cartList.push(products[i]);
            founded = true;
        }
        i++
    }

    //B- ecmas6 version
    let product = products.find(e => e.id === id);
    cartList.push(product);
} */


// Exercise 2
/* function cleanCart() {
    cartList = [];
} */


// Exercise 3
function calculateTotal() {

    // A- loop version
    // for (let i = 0; i < cartList.length; i++) {
    //     totalPrice += cartList[i].price;
    // }

    //B- ecmas6 version

    // cartList.map(e => total += e.subtotalWithDiscount ?? e.subtotal);
    cart.map(e => total += e.subtotalWithDiscount ?? e.subtotal);
    return total
}

// Exercise 4
/* function generateCart() {
 
    //A- loop version
    for (let i = 0; i < cartList.length; i++) {
        // si Cart está vacío, inyecto ítem directamente en CartList+creo prop 'quantity' en ese obj.
        if (cart.length === 0) {
            cart.push(cartList[i]);
            cart[i]['quantity'] = 1;
        } else {
            let j = 0;
            let idFounded = false;
            let idCartList = cartList[i].id;
            while (j < cart.length && !idFounded) {
                if (cart[j].id === idCartList) {
                    cart[j].quantity++
                        idFounded = true;
                }
                j++
            }
            if (!idFounded) {
                cart.push(cartList[i]);
                cart[cart.length - 1]['quantity'] = 1;
            }
        }
    }
    return cart
} */

// Exercise 5
/* function applyPromotionsCart() {
    
    if (generateCart().length > 0) {
        const OLI_QTY = 3
        const OLI_DISCOUNT = 0.5;
        const MIXT_CUPCAKES_QTY = 10;
        const COOKING_OIL = products.find(e => e.name === "cooking oil");
        const MIXT_CUPCAKES = products.find(e => e.name === "Instant cupcake mixture");

        //A- loop version
        for (let i = 0; i < cart.length; i++) {
            cart[i]['subtotal'] = cart[i].price * cart[i].quantity;
            if (cart[i].name === COOKING_OIL && cart[i].quantity >= OLI_QTY) {
                cart[i]['subtotalWithDiscount'] = cart[i].subtotal - (cart[i].quantity * OLI_DISCOUNT);
            } else if (cart[i].name === MIXT_CUPCAKES && cart[i].quantity >= MIXT_CUPCAKES_QTY) {
                cart[i]['subtotalWithDiscount'] = Math.round(((cart[i].subtotal * 2) / 3) * 100) / 100;
            }
        }
    } else {
        alert("Your products are not added to the current promotion")
    }
} */

// ** Nivell II **

// Exercise 7
function addToCart(id) {
    let matchProductId = products.find(e => e.id === id);
    let totalProducts = 0;

    if (cart.length === 0) {
        cart.push(matchProductId);
        cart[0]['quantity'] = 1;
    } else {
        let productPosition = cart.indexOf(matchProductId)
        if (productPosition == -1) {
            cart.push(matchProductId);
            cart[cart.length - 1]['quantity'] = 1;
        } else {
            cart[productPosition].quantity++
        }
    }
    applyPromotionsCart()

    cart.forEach(e => totalProducts += e.quantity)
    badgeCart.innerHTML = totalProducts;

}

function applyPromotionsCart() {

    if (cart.length > 0) {
        const OIL_QTY = 3
        const OIL_DISCOUNT = 0.5;
        const MIXT_CUPCAKES_QTY = 10;


        cart.map(product => {
            product['subtotal'] = product.price * product.quantity;
            if (product.name === "Cooking oil" && product.quantity >= OIL_QTY) {
                product['subtotalWithDiscount'] = product.subtotal - (product.quantity * OIL_DISCOUNT);
            } else if (product.name === "Instant cupcake mixture" && product.quantity >= MIXT_CUPCAKES_QTY) {
                product['subtotalWithDiscount'] = Math.round(((product.subtotal * 2) / 3) * 100) / 100;
            }
        });
    }
}




// Exercise 8
function removeFromCart(id) {
    let productToRemove = cart.findIndex(e => e.id === id);
    let badgeCartCount = parseInt(badgeCart.innerText);

    if (productToRemove >= 0 && cart[productToRemove].quantity == 1) {
        cart.splice(productToRemove, 1);
        badgeCartCount--;

    } else if (productToRemove >= 0 && cart[productToRemove].quantity > 1) {
        cart[productToRemove].quantity--;
        badgeCartCount--;


    } else {
        alert("This product is not in your cart");
    }
    badgeCart.innerHTML = badgeCartCount;

}



// Exercise 9
function printCart() {
    const DOM_LIST = document.getElementById('modal__cartList--items');
    const DOM_MODAL_TITTLE = document.getElementById('modal__cart--title');
    const DOM_TOTAL = document.getElementById('totalExpenses');
    let printProduct = "";


    if (cart.length !== 0) {
        DOM_MODAL_TITTLE.innerHTML = "Current products in your cart"
    }

    for (let productProperties of cart) {
        // nullish coleascing operator to pick subTotalWithDiscount if the product applys to promotions
        printProduct += `<li class="row align-items-baseline">
        <i class="bi bi-bag-check-fill col-1"></i>
        <h6 class="col-11"> ${productProperties.name}</h6>
        <p class="text-muted col-4">Quantity:</p>
        <div class="col-4">
        <span class="badge bg-dark rounded-pill">${productProperties.quantity}</span>
        </div>
        <p class="text-muted">Subtotal ${productProperties.subtotalWithDiscount ?? productProperties.subtotal}€</p>
        </li>`
    }

    DOM_LIST.innerHTML = printProduct;
    DOM_TOTAL.innerHTML = `Total: ${calculateTotal()}€`
}


function open_modal() {
    printCart();
}