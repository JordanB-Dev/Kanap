sessionStorage.clear();
localStorage.clear();

let idOrder = new URLSearchParams(document.location.search).get("command");

document
  .getElementById("orderId")
  .insertAdjacentHTML("beforeend", `<br>${idOrder}<br>Merci pour votre achat`);
console.log("valeur de l'orderId venant de l'url: " + idOrder);

idOrder = undefined;
