// Access DOM
const title = document.getElementsByTagName('title');
const itemImg = document.getElementsByClassName('item__img');



    let url = window.location.href;
    let newURL = new URL(url);
    let id = newURL.searchParams.get('id');
    



//console.log(id);

// Getting a single product

const getProduct =  async (id) => {
    
    const response = await fetch('http://localhost:3000/api/products/?{id}');
    const data = await response.json();

    console.log(data);


}

getProduct(id);