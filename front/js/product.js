// Access DOM
const title = document.getElementsByTagName("title");
const sofaImg = document.querySelector(".item__img");
const sofaName = document.querySelector("#title");
const sofaPrice = document.getElementById("price");
const sofaDescription = document.getElementById("description");
const sofaColors = document.getElementById("colors");
const quantity = document.querySelector("#quantity");
const addToCartBtn = document.querySelector("#addToCart");

// Getting a single product

const getProduct = async () => {
  const productId = document.location.search.split("=")[1];

  const response = await fetch(
    "http://localhost:3000/api/products/" + productId
  );
  const data = await response.json();

  // // Display sofa details on the DOM

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

let selectedColor;
let selectedQty = 0;

sofaColors.addEventListener(
  "change",
  ({ target }) => (selectedColor = target.value)
);
quantity.addEventListener(
  "change",
  ({ target }) => (selectedQty = +target.value)
);

const addToCart = ({ name, price, imageUrl, _id }) => {
  const product = {
    name,
    price,
    imageUrl,
    _id,
    cartId: new Date().getTime(), // get random sofa id for further processing
    color: selectedColor,
    qty: selectedQty,
  };

  // update the quantity when products of same colour and id added to the cart

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItem = cart.find((item) => {
    if (item._id === product._id && item.color === product.color) {
      item.qty += Number(product.qty);

      return item;
    }
  });

  //console.log({cartItem})

  if (cartItem) {
    cart = cart.filter((item) => item.cartId !== cartItem.cartId);
    cart = [...cart, cartItem];
  } else {
    cart = [...cart, product];
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // console.log(product)
  // console.log(cart)

  // add toast notification

  let notification = document.getElementById("confirmation");
  notification.innerHTML = "Added to cart";
  notification.className = "toast";
  setTimeout(function () {
    notification.className = notification.className.replace("toast", " ");
  }, 2000);
};

(async () => {
  const product = await getProduct();

  addToCartBtn.addEventListener("click", () => addToCart(product));
})();
