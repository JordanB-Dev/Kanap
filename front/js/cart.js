const errorApi = document.querySelector("h1");

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((obj) => {
    displayBasket(obj);
  })
  .catch((error) => {
    errorApi.insertAdjacentHTML("beforeend", `<h1>404 NOT FOUND</h1>`);
    console.log("Error api:" + " " + error);
  });

const basket = JSON.parse(localStorage.getItem("basketStocked"));
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const h1 = document.querySelector("h1");

const displayBasket = (index) => {
  if (basket && basket.length != 0) {
    for (let data of basket) {
      for (let i = 0, j = index.length; i < j; i++) {
        if (data._id === index[i]._id) {
          data.name = index[i].name;
          data.prix = index[i].price;
          data.image = index[i].imageUrl;
          data.description = index[i].description;
          data.alt = index[i].altTxt;
        }
      }
    }
    display(basket);
  } else {
    totalQuantity.insertAdjacentHTML("beforeend", `0`);
    totalPrice.insertAdjacentHTML("beforeend", `0`);
    h1.innerHTML = "Vous n'avez pas d'article dans votre panier";
  }
  editQuantity();
  deleteProduct();
};

const zoneBasket = document.getElementById("cart__items");

const display = (cart) => {
  zoneBasket.insertAdjacentHTML(
    "beforeend",
    cart
      .map(
        (data) =>
          `<article class="cart__item" data-id="${data._id}" data-couleur="${data.couleur}" data-quantité="${data.quantité}"> 
    <div class="cart__item__img">
      <img src="${data.image}" alt="${data.alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${data.name}</h2>
        <span>couleur : ${data.couleur}</span>
        <p data-prix="${data.prix}">${data.prix} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${data.quantité}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${data._id}" data-couleur="${data.couleur}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
      )
      .join("")
  );
  productTotal();
};

const editQuantity = () => {
  const edit = document.querySelectorAll(".cart__item");
  edit.forEach((cart) => {
    cart.addEventListener("click", (e) => {
      let editBasket = JSON.parse(localStorage.getItem("basketStocked"));

      for (data of editBasket)
        if (
          data._id === cart.dataset.id &&
          cart.dataset.couleur === data.couleur
        ) {
          data.quantité = e.target.value;
          localStorage.basketStocked = JSON.stringify(editBasket);
          cart.dataset.quantité = eq.target.value;
          productTotal();
        }
    });
  });
};

const deleteProduct = () => {
  const cartdelete = document.querySelectorAll(".cart__item .deleteItem");

  cartdelete.forEach((cartdelete) => {
    cartdelete.addEventListener("click", () => {
      let deleteBasket = JSON.parse(localStorage.getItem("basketStocked"));

      for (let i = 0, j = deleteBasket.length; i < j; i++)
        if (
          deleteBasket[i]._id === cartdelete.dataset.id &&
          deleteBasket[i].couleur === cartdelete.dataset.couleur
        ) {
          const num = [i];

          let newBasket = JSON.parse(localStorage.getItem("basketStocked"));

          newBasket.splice(num, 1);
          if (newBasket && newBasket.length == 0) {
            totalQuantity.insertAdjacentHTML("beforeend", `0`);
            totalPrice.insertAdjacentHTML("beforeend", `0`);
            h1.innerHTML = "Vous n'avez pas d'article dans votre panier";
          }
          localStorage.basketStocked = JSON.stringify(newBasket);
          productTotal();
          return location.reload();
        }
    });
  });
};

const productTotal = () => {
  let totalBasket = JSON.parse(localStorage.getItem("basketStocked"));

  let totalArticle = 0;
  let newTotalPrice = 0;
  let priceTotal = 0;

  for (let product of totalBasket) {
    totalArticle += JSON.parse(product.quantité);
    newTotalPrice = JSON.parse(product.quantité) * JSON.parse(product.prix);
    priceTotal += newTotalPrice;
  }

  totalQuantity.textContent = totalArticle;
  totalPrice.textContent = priceTotal;
};

let contactClient = {};
localStorage.contactClient = JSON.stringify(contactClient);

const inputs = document.querySelectorAll(
  'input[type="text"], input[type="email"]'
);

const regex = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;

const firstNameChecker = (value) => {
  const errorDisplay = document.getElementById("firstNameErrorMsg");
  errorDisplay.style.color = "white";

  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay.textContent = "Le prénom doit faire entre 3 et 20 caractères.";
    contactClient.checkFirstName = 0;
  } else if (!value.match(regex)) {
    errorDisplay.textContent =
      "Le prénom ne doit pas  contenir de cractères spéciaux";
    contactClient.checkFirstName = 0;
  } else {
    errorDisplay.textContent = "";
    contactClient.firstName = firstName.value;
    contactClient.checkFirstName = 1;
  }
  localStorage.contactClient = JSON.stringify(contactClient);
  validClick();
};

const lastNameChecker = (value) => {
  const errorDisplay = document.getElementById("lastNameErrorMsg");
  errorDisplay.style.color = "white";

  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay.textContent = "Le nom doit faire entre 3 et 20 caractères.";
    contactClient.checkLastName = 0;
  } else if (!value.match(regex)) {
    errorDisplay.textContent =
      "Le nom ne doit pas  contenir de cractères spéciaux";
    contactClient.checkLastName = 0;
  } else {
    errorDisplay.textContent = "";
    contactClient.lastName = lastName.value;
    contactClient.checkLastName = 1;
  }
  localStorage.contactClient = JSON.stringify(contactClient);
  validClick();
};

const addressChecker = (value) => {
  const errorDisplay = document.getElementById("addressErrorMsg");
  errorDisplay.style.color = "white";

  if (value.length > 0 && (value.length < 3 || value.length > 30)) {
    errorDisplay.textContent = "L'adresse doit faire entre 3 et 30 caractères.";
    contactClient.checkAddress = 0;
  } else if (
    !value.match(/^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i)
  ) {
    errorDisplay.textContent =
      "L'adresse ne doit pas  contenir de cractères spéciaux";
    contactClient.checkAddress = 0;
  } else {
    errorDisplay.textContent = "";
    contactClient.address = address.value;
    contactClient.checkAddress = 1;
  }
  localStorage.contactClient = JSON.stringify(contactClient);
  validClick();
};

const cityChecker = (value) => {
  const errorDisplay = document.getElementById("cityErrorMsg");
  errorDisplay.style.color = "white";

  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay.textContent = "La ville doit faire entre 3 et 20 caractères.";
    contactClient.checkCity = 0;
  } else if (!value.match(regex)) {
    errorDisplay.textContent =
      "La ville ne doit pas  contenir de cractères spéciaux";
    contactClient.checkCity = 0;
  } else {
    errorDisplay.textContent = "";
    contactClient.city = city.value;
    contactClient.checkCity = 1;
  }
  localStorage.contactClient = JSON.stringify(contactClient);
  validClick();
};

const emailChecker = (value) => {
  const errorDisplay = document.getElementById("emailErrorMsg");
  errorDisplay.style.color = "white";

  if (
    !value.match(
      /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i
    )
  ) {
    errorDisplay.textContent = "Le mail n'est pas valide";
    contactClient.checkEmail = 0;
  } else {
    errorDisplay.textContent = "";
    contactClient.email = email.value;
    contactClient.checkEmail = 1;
  }
  localStorage.contactClient = JSON.stringify(contactClient);
  validClick();
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
      case "lastName":
        lastNameChecker(e.target.value);
        break;
      case "address":
        addressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
});

const command = document.getElementById("order");

const validClick = () => {
  let contactRef = JSON.parse(localStorage.getItem("contactClient"));

  let sum =
    contactRef.checkFirstName +
    contactRef.checkLastName +
    contactRef.checkAddress +
    contactRef.checkCity +
    contactRef.checkEmail;

  if (sum === 5) {
    command.removeAttribute("disabled", "disabled");
    command.setAttribute("value", "Commander !");
  } else {
    command.setAttribute("disabled", "disabled");
    command.setAttribute("value", "Remplir le formulaire");
  }
};

command.addEventListener("click", (e) => {
  e.preventDefault();
  validClick();
  sendpack();
});

let basketId = [];

const picture = () => {
  let basket = JSON.parse(localStorage.getItem("basketStocked"));

  if (basket && basket.length > 0) {
    for (let index of basket) {
      basketId.push(index._id);
    }
  } else {
    console.log("le panier est vide");
    command.setAttribute("value", "Panier vide !");
  }
};

let contactRef;
let commandFinal;

const pack = () => {
  contactRef = JSON.parse(localStorage.getItem("contactClient"));

  commandFinal = {
    contact: {
      firstName: contactRef.firstName,
      lastName: contactRef.lastName,
      address: contactRef.address,
      city: contactRef.city,
      email: contactRef.email,
    },
    products: basketId,
  };
};

const sendpack = () => {
  picture();
  pack();
  console.log(commandFinal);
  let sum =
    contactRef.checkFirstName +
    contactRef.checkLastName +
    contactRef.checkAddress +
    contactRef.checkCity +
    contactRef.checkEmail;

  if (basketId.length != 0 && sum === 5) {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commandFinal),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = `/front/html/confirmation.html?command=${data.orderId}`;
      })
      .catch(function (error) {
        console.log(error);
        alert("erreur");
      });
  }
};
