const productData = document.getElementById("items");
const errorApi = document.querySelector(".titles");

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((obj) => {
    sofa(obj);
  })
  .catch((error) => {
    errorApi.insertAdjacentHTML("beforeend", `<h1>404 NOT FOUND</h1>`);
    console.log("Error api:" + " " + error);
  });

const sofa = (index) => {
  for (let product of index) {
    productData.insertAdjacentHTML(
      "beforeend",
      `<a href="./product.html?_id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`
    );
  }
};
