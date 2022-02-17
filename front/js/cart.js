// DOM elements
const firstName = document.querySelector("#firstName");
const lastName = document.getElementById("lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.getElementById("email");
const btnOrder = document.querySelector("#order");
const products = document.querySelector(".cart__item");
let deleteBtns,
  qtyInputs = [];

// function to calculate the total price of the products in the cart and update products number in cart

const updateTotal = () => {
  let cartProducts = JSON.parse(localStorage.getItem("cart"));
  let cartQuantity = document.querySelector("#totalQuantity");
  cartQuantity.innerHTML = cartProducts.length;

  let cartItems = JSON.parse(localStorage.getItem("cart"));
  let total = document.querySelector("#totalPrice");
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
    }
  }
};

// function to display front end data to page and update page when product added or removed

const displayCart = () => {
  const cartItems = localStorage.getItem("cart");

  let cart = cartItems ? JSON.parse(cartItems) : [];
  cart = [...cart];

  products.innerHTML = "";

  cart.forEach((item) => {
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
                <div data-cartId="${item.cartId}" class="cart__item__content__settings">
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
        `;
  });

  updateTotal();

  deleteBtns = document.querySelectorAll(".deleteItem");
  qtyInputs = document.querySelectorAll(".itemQuantity");

  deleteBtns.forEach((btn) => btn.addEventListener("click", removeProduct));
  qtyInputs.forEach((input) => {
    input.addEventListener("keyup", updateQuantity);
    input.addEventListener("change", updateQuantity);
  });

  // console.log(qtyInputs)
};
displayCart();

// function to remove products from cart and update the localstorage

function removeProduct({ target }) {
  const cartId = Number(target.parentNode.parentNode.dataset.cartid);

  let cartItems = JSON.parse(localStorage.getItem("cart"));

  console.log({ before: cartItems });
  cartItems = cartItems.filter((item) => item.cartId !== cartId);
  console.log({ after: cartItems });

  localStorage.setItem("cart", JSON.stringify(cartItems));

  // update cart

  displayCart();
}

// change product quantity then update the price

function updateQuantity({ target }) {
  const cartId = Number(target.parentNode.parentNode.dataset.cartid);

  let cartItems = JSON.parse(localStorage.getItem("cart"));

  console.log({ before: cartItems });
  cartItems = cartItems.map((item) => {
    if (item.cartId === cartId) {
      item.qty = Number(target.value);
      return item;
    }

    return item;
  });
  console.log({ after: cartItems });

  localStorage.setItem("cart", JSON.stringify(cartItems));
  displayCart();
}
