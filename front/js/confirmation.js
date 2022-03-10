// SHOWING ORDER ID ON CONFIRMATION PAGE

const urlConfirmation = new URL(window.location.href);

const getOrderId = () => {
  //console.log(urlConfirmation);
  const getConfirmationId = urlConfirmation.searchParams.get("id");
  //console.log(getConfirmationId);
  document.getElementById("orderId").innerHTML = getConfirmationId;
};
getOrderId();
