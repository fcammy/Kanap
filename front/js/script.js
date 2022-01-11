
// DOM access
const items = document.querySelector('.items');


// get data from API

const getAllProducts =  async () => {

    
   const response = await fetch('http://localhost:3000/api/products');

   const data = await response.json()
  
    data.forEach (product => {

     //console.log(items);
     
      // Displaying products on the DOM.
      
      items.innerHTML += `
     
      <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>
     ` 
    });

     
    };
   


getAllProducts();

    

