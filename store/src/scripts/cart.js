"use strict";

// https://64861de3a795d24810b7b9b2.mockapi.io/products/Shoes

// ---- ---- Const ---- ---- //
const inputBox = document.querySelector(".input-box");
const closeIcon = document.querySelector(".close-icon");

// ---- ---- Open Input ---- ---- //
document.querySelector(".search").addEventListener("click", () => {
  inputBox.classList.add("open");
});
// ---- ---- Close Input ---- ---- //
closeIcon.addEventListener("click", () => {
  inputBox.classList.remove("open");
});

const productsElement = document.querySelector(".products");

function summarizeName(name) {
  if (name.length > 10) {
    return name.slice(0, 10) + "...";
  }
  return name;
}

function renderOperator(array) {
  array.forEach((productData) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
    <img
    class="photo"
    src="${productData.imgLocation}"
    alt="${productData.name}"
  />
  <div class="details">
    <div class="top-details">
      <p class="product-name">${summarizeName(productData.name)}</p>
      <span class="material-symbols-outlined delete" data-id="${
        productData.id
      }"> delete </span>
    </div>
    <div class="mid-details">
    <span class="color" style="background-color: ${productData.color};"></span>
      <span>|</span>
      <p class="size">size = <span>${productData.size}</span></p>
    </div>
    <div class="bott-detils">
    <p class="price" data-base-pric="${
      productData.startPrice
    }"><span>$</span><span>${productData.finalPrice}</span><span>.00</span></p>
      <div class="count">
        <span id="decrement">-</span>
        <span id="value">${productData.count}</span>
        <span id="increment">+</span>
      </div>
    </div>
  </div>
    `;
    // productElement.onclick = () => {
    //   window.location.href = `http://127.0.0.1:5500/store/productPage.html?${productData.id}`;
    // };
    productsElement.appendChild(productElement);
  });
}

async function renderCart() {
  const res = await axios.get(
    "https://64861de3a795d24810b7b9b2.mockapi.io/products/Cart"
  );
  const cartList = res.data;
    console.log(cartList);
  while (productsElement.firstChild) {
    productsElement.removeChild(productsElement.firstChild);
  }
  renderOperator(cartList);
}

renderCart().then((data) => {
  const deleteIcon = document.querySelectorAll(".delete");
  deleteIcon.forEach((targetIcon) => {
    targetIcon.addEventListener("click", function (event) {
      // console.log(targetIcon.parentNode.parentNode.parentNode);
      var objectId = +event.target.dataset.id;
      productsElement.removeChild(targetIcon.parentNode.parentNode.parentNode);

      axios
        .delete(
          `https://64861de3a795d24810b7b9b2.mockapi.io/products/Shoes/${objectId}`
        )
        .then((response) => {
          console.log(`Object with ID ${objectId} deleted successfully`);
          setTimeout(() => window.location.reload, 1500);
        })
        .catch((error) => {
          console.error(`Error deleting object with ID ${objectId}: ${error}`);
        });
    });
  });
  const searchInput = document.querySelector("#search-input");
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const reciveData = data.json()
      const search = reciveData.filter((product) => {
        return product.name === this.value; // add "return" here
      });
      while (productsElement.firstChild) {
        productsElement.removeChild(productsElement.firstChild);
      }
      renderOperator(search);
    }
  });
});
