
 // SHOWING ORDER ID ON CONFIRMATION PAGE

const orderId = sessionStorage.getItem("orderId");

console.log({orderId});

document.querySelector('#orderId').innerHTML =  orderId;