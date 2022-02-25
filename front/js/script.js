// DOM access
const items = document.querySelector(".items");

// Get products from API then display on the frond end using the fecth method.

const getAllProducts = async () => {
  const response = await fetch("http://localhost:3000/api/products");

  if (response.status !== 200) {
    throw new Error("cannot fetch the data"); // Initialising error message to display.
  }

  const data = await response.json();

  data.forEach((product) => {
    //Go through list of products on the backend and displaying products on the DOM.

    items.innerHTML += `
     
      <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>
     `;
  });
};

// Trying to catch an error if there are any will display the error to the console.

getAllProducts().catch((err) => console.log("rejected:", err.message));
