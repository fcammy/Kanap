
      // SHOWING ORDER ID ON CONFIRMATION PAGE

const orderId = sessionStorage.getItem("orderId");

console.log({orderId});

console.log({confirm: document.querySelector('#orderId')})

document.querySelector('#orderId').innerHTML =  orderId;