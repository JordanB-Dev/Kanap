const params = new URLSearchParams(window.location.search);
const id = params.get("_id");
const errorApi = document.querySelector(".item");
console.log(id);

const fetchProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => (productData = data))
    .catch((error) => {
      errorApi.insertAdjacentHTML("beforeend", `<h1>404 NOT FOUND</h1>`);
      console.log("Error api:" + " " + error);
    });
  console.log(productData);
};

const imageAlt = document.querySelector("article div.item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
let productClient = {};
productClient._id = id;

const productDisplay = async () => {
  await fetchProduct();
  imageAlt.insertAdjacentHTML(
    "beforeend",
    `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`
  );
  title.textContent = `${productData.name}`;
  price.textContent = `${productData.price}`;
  description.textContent = `${productData.description}`;
  productClient.prix = `${productData.price}`;
  for (let couleur of productData.colors) {
    colors.insertAdjacentHTML(
      "beforeend",
      `<option value="${couleur}">${couleur}</option>`
    );
  }
};
productDisplay();

let colorProduct;
const addProduct = document.getElementById("addToCart");

colors.addEventListener("input", (e) => {
  colorProduct = e.target.value;
  productClient.couleur = colorProduct;
  addProduct.style.color = "white";
  addProduct.textContent = "Ajouter au panier";
  console.log(colorProduct);
});

const quantity = document.getElementById("quantity");
let productQuantity;

quantity.addEventListener("input", (e) => {
  productQuantity = e.target.value;
  productClient.quantité = productQuantity;
  addProduct.style.color = "white";
  addProduct.textContent = "Ajouter au panier";
  console.log(productQuantity);
});

addProduct.addEventListener("click", () => {
  if (
    productClient.quantité < 1 ||
    productClient.quantité > 100 ||
    productClient.quantité === undefined ||
    productClient.couleur === "" ||
    productClient.couleur === undefined
  ) {
    alert(
      "Pour valider le choix de cet article, veuillez renseigner une couleur, et/ou une amount valide entre 1 et 100"
    );
  } else {
    basket();
    console.log("clic effectué");
    addProduct.style.color = "rgb(0, 210, 0)";
    addProduct.textContent = "Produit ajouté !";
  }
});

let choiceProductClient = [];
let productRegistered = [];
let productTemporary = [];
let productPush = [];

const firstProduct = () => {
  console.log(productRegistered);
  if (productRegistered === null) {
    choiceProductClient.push(productClient);
    console.log(productClient);
    return (localStorage.basketStocked = JSON.stringify(choiceProductClient));
  }
};

const otherProduct = () => {
  productPush = [];
  productTemporary.push(productClient);
  productPush = [...productRegistered, ...productTemporary];
  productPush.sort(function triage(a, b) {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    if ((a._id = b._id)) {
      if (a.couleur < b.couleur) return -1;
      if (a.couleur > b.couleur) return 1;
    }
    return 0;
  });
  productTemporary = [];
  return (localStorage.basketStocked = JSON.stringify(productPush));
};

const basket = () => {
  productRegistered = JSON.parse(localStorage.getItem("basketStocked"));
  if (productRegistered) {
    for (let data of productRegistered) {
      if (data._id === id && data.couleur === productClient.couleur) {
        alert("RAPPEL: Vous aviez déja choisit cet article.");
        let additionQuantity =
          parseInt(data.quantité) + parseInt(productQuantity);
        data.quantité = JSON.stringify(additionQuantity);
        return (localStorage.basketStocked = JSON.stringify(productRegistered));
      }
    }
    return otherProduct();
  }
  return firstProduct();
};
