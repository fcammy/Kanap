// Access DOM
const title = document.getElementsByTagName("title");
const sofaImg = document.querySelector(".item__img");
const sofaName = document.querySelector("#title");
const sofaPrice = document.getElementById("price");
const sofaDescription = document.getElementById("description");
const sofaColors = document.getElementById("colors");
const quantity = document.querySelector("#quantity");
const addToCartBtn = document.querySelector("#addToCart");

// GETTING A SINGLE PRODUCT FROM API

const getProduct = async () => {
  // Getting a single product ID to be able to display on a single page

  const productId = document.location.search.split("=")[1];

  const response = await fetch(
    "http://localhost:3000/api/products/" + productId
  );
  const data = await response.json();

  // console.log(data);

  // // DISPLAY SOFA DETAILS ON THE PAGE

  document.title = `${data.name}`;
  title.innerHTML = `${data.name}`;
  sofaImg.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
  sofaName.innerHTML = `${data.name}`;
  sofaPrice.innerHTML = `${data.price}`;
  sofaDescription.innerHTML = `${data.description}`;

  data.colors.forEach((c) => {
    sofaColors.innerHTML += `<option value="${c}">${c}</option>`;
  });

  return data;
};

// Declaring color and quantity variables

let selectedColor = "";
let selectedQty = 0;

// Adding event listener to color and quantity dropbox

sofaColors.addEventListener(
  "change",
  ({ target }) => (selectedColor = target.value)
);

quantity.addEventListener(
  "change",
  ({ target }) => (selectedQty = +target.value)
);

// Function to add product to cart

const addToCart = ({ name, price, imageUrl, _id }) => {
  // Checking if color and quantity have been selected

  if (selectedColor === "" || Number(selectedQty) < 1) {
    const error = document.getElementById("error");

    // error to disappear after 2 seconds
    setTimeout(() => (error.innerHTML = ""), 2000);

    // displays error message to DOM

    return (error.innerHTML = "You must select a quantity and color!");
  }

  // Declaring product object to hold the parameters

  const product = {
    name,
    price,
    imageUrl,
    _id,
    cartId: new Date().getTime(), // GET RANDOM ID FOR PROCESSING
    color: selectedColor,
    qty: selectedQty,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // UPDATE THE QUANTITY WHEN PRODUCTS OF SAME COLOUR AND ID ADDED TO THE CART

  const cartItem = cart.find(
    (item) => item._id === product._id && item.color === product.color
  );

  // checking if cartID are not similar then add the products to cart

  if (cartItem) {
    cartItem.qty += Number(product.qty);

    cart = cart.filter((item) => item.cartId !== cartItem.cartId); // Exclude found item in cart
    cart = [...cart, cartItem]; // Add modified item in cart
  } else {
    cart = [...cart, product];
  }

  // Storing product in local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  // ADD TOAST NOTIFCATION

  const notification = document.getElementById("confirmation");

  notification.innerHTML = "Added to cart";
  notification.className = "toast";

  // function to display the toast for 2 seconds then disappear

  setTimeout(
    () =>
      (notification.className = notification.className.replace("toast", " ")),
    2000
  );
};

// Adding to cart functionality to the cart button using the eventlistener method.
(async () => {
  const product = await getProduct();

  addToCartBtn.addEventListener("click", () => addToCart(product));
})();
