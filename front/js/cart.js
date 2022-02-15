// DOM elements
const firstName = document.querySelector('#firstName');
const lastName = document.getElementById('lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.getElementById('email');
const btnOrder = document.querySelector('#order');
const products = document.querySelector('.cart__item');
const deleteBtn = document.querySelector('.deleteItem');



// get items from local storage and display them on the page

const displayCart = () => {
    
    const cartItems = localStorage.getItem('cart'); 

    let cart = cartItems ? JSON.parse(cartItems) : [];
    cart = [...cart];

    cart.forEach(item => {

        //console.log(item);

        // displaying products on the DOM
        
        products.innerHTML += `

        <section class="cart">
            <section id="cart__items>
                <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                <img src="${item.imageUrl}" alt="Photo of a sofa">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2 class="product__name">${item.name}</h2>
                    <p class="product__color">${item.color}</p>
                    <p class="product__price">€ ${item.price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Delete</p>
                    </div>
                </div>
                </div>
            </article>
        </section>
      </section>
        `
    
        
    });
             
      }
    
displayCart();

// cart badge shows number of items in the cart

const cartNum = () => {

    const localStorageProducts = localStorage.getItem('cart');
    let cartProducts = JSON.parse(localStorageProducts);
    let cartQuantity = document.querySelector('#totalQuantity');
    cartQuantity.innerHTML += cartProducts.length;

}

cartNum();




// function to remove products from cart and update the localstorage


//deleteBtn.addEventListener('click', () => removeProduct(index));

function removeProduct() {

    let cartItems = JSON.parse(localStorage.getItem('cart'));
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    // update cart

    displayCart();
}
 

// function to calculate the total price of the products in the cart


function calculateTotalPrice() {

    let cartItems = JSON.parse(localStorage.getItem('cart'));
    let total = document.querySelector('#totalPrice');
    let totalPrice = 0;
    if (cartItems) {

        for (let i = 0; i < cartItems.length; i++) {
        
            // convert array object into number
            let priceString = cartItems[i].price.toString();
            let price = priceString.substring();
            let convertedPrice = parseInt(price);
            let itemPrice = convertedPrice * cartItems[i].qty;
            totalPrice += itemPrice;
            total.innerHTML = totalPrice;
            //console.log(totalPrice);

                }

    }
}

calculateTotalPrice();

// change product quantity then update the price

function updateQuantity(i, value) {
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    cartItems[i].qty = e.target.parseInt(value);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    // update cart
    displayCart();
    // update the total price
    calculateTotalPrice();
}

updateQuantity();