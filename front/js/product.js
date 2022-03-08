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

let selectedColor;
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

console.log({selectedQty, selectedColor});
// 
// Checking if color and quantity have been selected
if( typeof selectedColor === 'undefined' || Number(selectedQty) < 1 ) return document.getElementById('error').innerHTML = ' You must select a color and quantity';



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
  console.log({cart});

  // UPDATE THE QUANTITY WHEN PRODUCTS OF SAME COLOUR AND ID ADDED TO THE CART
  

  let cartItem = {};
  if(cart.length > 0) {
     cartItem = cart.find((item) => {
      // checking for product ID and color are the same then update the quantity
    
      if (item._id === product._id && item.color === product.color) {
        item.qty += Number(product.qty);
  
        return item;
      }
    });
  
  }

  console.log({cartItem});

  

  // checking if cartID are not similar then add the products to cart

  if (Object.keys(cartItem).length > 0 || (Object.keys(cartItem) === null)) {
    cart = cart.filter((item) => {
      console.log({item});
      // console.log({cartItem});
      return item.cartId !== cartItem.cartId
    });
    cart = [...cart, cartItem];
  } else {
    cart = [...cart, product];
  }

  

  // Storing product in local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  const notification = document.getElementById("confirmation");

  notification.innerHTML = "Added to cart";
  notification.className = "toast";


  setTimeout( () => notification.className = notification.className.replace("toast", " "), 2000);

};

 // ADD TOAST NOTIFCATION

 
 
 // function to display the toast for 2 seconds then disappear
 


// Adding to cart functionality to the cart button using the eventlistener method.
(async () => {
  const product = await getProduct();

  addToCartBtn.addEventListener("click", () => addToCart(product));
})();


