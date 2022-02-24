// DOM elements
const firstName = document.querySelector("#firstName");
const lastName = document.getElementById("lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.getElementById("email");
const btnOrder = document.getElementById("order");
const product = document.querySelector(".cart__item");
const form = document.querySelector(".cart__order__form");
const cartQuantity = document.querySelector("#totalQuantity");
const total = document.querySelector("#totalPrice");




let deleteBtns,
  qtyInputs = [];

// FUNCTION TO CALCULATE THE TOTAL PRICE OF THE PRODUCTS IN THE CART AND UPDATE PRODUCTS NUMBER IN CART

const updateTotal = () => { 
  let cartProducts = JSON.parse(localStorage.getItem("cart"));
  cartQuantity.innerHTML = cartProducts.length;

  let cartItems = JSON.parse(localStorage.getItem("cart"));
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

// FUNCTION TO DISPLAY FRONT END DATA TO PAGE AND UPDATE PAGE WHEN PRODUCT ADDED OR REMOVED



const displayCart = (cartItems) => {
  

  let cart = cartItems ? JSON.parse(cartItems) : [];
  cart = [...cart];

  product.innerHTML = "";

  cart.forEach((item) => {
    //console.log(item);

    // DISPLAYING PRODUCTS ON THE DOM

    product.innerHTML += `

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

let cartItems = localStorage.getItem("cart");

if(cartItems) {
  displayCart(cartItems) 
} else {
  product.innerHTML = `<p>Cart is empty</p>`;
  cartQuantity.innerHTML = 0;
  total.innerHTML = '0.00'
}

// FUNCTION TO REMOVE PRODUCTS FROM CART AND UPDATE LOCALSTORAGE

function removeProduct({ target }) {
  const cartId = Number(target.parentNode.parentNode.dataset.cartid);

  let cartItems = JSON.parse(localStorage.getItem("cart"));

  cartItems = cartItems.filter((item) => item.cartId !== cartId);

  localStorage.setItem("cart", JSON.stringify(cartItems));

  // update cart
  displayCart(JSON.stringify(cartItems));
}

// CHANGE PRODUCT QUANTITY THEN UPDATE PRICE

function updateQuantity({ target }) {
  const cartId = Number(target.parentNode.parentNode.dataset.cartid);

  let cartItems = JSON.parse(localStorage.getItem("cart"));

  cartItems = cartItems.map((item) => {
    if (item.cartId === cartId) {
      item.qty = Number(target.value);
      return item;
    }

    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cartItems));

  displayCart(JSON.stringify(cartItems));
}

// VALIDATION INITIALASATION

let isFirstNameValid = false;
let isLastNameValid = false;
let isEmailValid = false;
let isAddressValid = false;
let isCityValid = false;

// VALIDATE FIRST NAME

firstName.addEventListener("blur", () => {
  const firstNamePattern = /^[a-zA-Z]+$/;
  const firstNameError = document.getElementById("firstNameErrorMsg");

  if (firstNamePattern.test(firstName.value)) {
    firstNameError.textContent = "Name entered is valid";
    isFirstNameValid = true;
  } else {
    firstNameError.textContent = "Name must not contain a number";
    return false;
  }
});

// VALIDATE LAST NAME

lastName.addEventListener("blur", () => {
  const lastNamePattern = /^[a-zA-Z]+$/;
  const lastNameError = document.getElementById("lastNameErrorMsg");

  if (lastNamePattern.test(lastName.value)) {
    lastNameError.textContent = "Last Name entered is valid";
    isLastNameValid = true;
  } else {
    lastNameError.textContent = "Last Name must not contain a number";
    return false;
  }
});

// VALIDATE ADDRESS

address.addEventListener("blur", () => {
  const addressPattern = /^\s*\S+(?:\s+\S+){2}/;
  const addressError = document.getElementById("addressErrorMsg");

  if (addressPattern.test(address.value)) {
    addressError.textContent = "Address entered is valid";
    isAddressValid = true;
  } else {
    addressError.textContent = "You must enter a valid address";
    return false;
  }
});

// VALIDATE CITY

city.addEventListener("blur", () => {
  const cityPattern = /^[a-zA-Z]+$/;
  const cityError = document.getElementById("cityErrorMsg");

  if (cityPattern.test(city.value)) {
    cityError.textContent = "City entered is valid";
    isCityValid = true;
  } else {
    cityError.textContent = "You must enter a valid city";
    return false;
  }
});

// VALIDATE EMAIL ADDRESS

email.addEventListener("blur", () => {
  const emailPattern =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const emailError = document.getElementById("emailErrorMsg");

  if (emailPattern.test(email.value)) {
    emailError.textContent = " Email is valid";
    isEmailValid = true;
  } else {
    emailError.textContent = " Email is invalid";
    return false;
  }
});

// POST DATA ENTERED BY THE USER

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let products = [];

  // GET SOFA ID AND PUSH IT TO ARRAY

  let cartItems = JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < cartItems.length; i++) {
    products.push(cartItems[i]._id);
  }
  //console.log(products);
  //STORING OBJECT INFORMATION FROM USER

  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    address: address.value,
    city: city.value,
  };

  let data = {
    contact: contact,
    products: products,
  };

  if (
    isFirstNameValid &&
    isLastNameValid &&
    isAddressValid &&
    isCityValid &&
    isEmailValid
  ) {
    sendInfo(data);
  }
});

// SENDING INFORMATION TO API

const sendInfo = (data) => {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {

      console.log(data);

      sessionStorage.setItem("orderId", data.orderId);
      localStorage.removeItem("cart");

      location.replace("/front/html/confirmation.html");




      
    })
    .catch((err) => {
      console.log(err);
    });

    
};







//sessionStorage.removeItem("orderId");
