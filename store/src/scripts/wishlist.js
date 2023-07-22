"use strict";

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
        style="width: 142px; height: 142px; object-fit: contain;"
        class="photo"
        src="${productData.image[0]}"
        alt="${productData.name}"
      />
      <p class="product-name">${summarizeName(productData.name)}</p>
      <p class="price">$ ${productData.price}</p>
    `;
    productElement.onclick = () => {
      window.location.href = `http://127.0.0.1:5500/store/productPage.html?${productData.id}`;
    };
    productsElement.appendChild(productElement);
  });
}

async function renderWishList() {
  const res = await axios.get(
    "https://64861de3a795d24810b7b9b2.mockapi.io/products/Shoes"
  );
  const dataList = res.data;
  const wishList = dataList.filter((product) => {
    return product.wishList === true;
  });
  console.log(wishList);

  while (productsElement.firstChild) {
    productsElement.removeChild(productsElement.firstChild);
  }
  renderOperator(wishList);
  // renderOperator(wishList);
}
renderWishList();

async function renderByBrand(btnBrand) {
  while (productsElement.firstChild) {
    productsElement.removeChild(productsElement.firstChild);
  }
  const res = await axios.get(
    "https://64861de3a795d24810b7b9b2.mockapi.io/products/Shoes"
  );
  const dataList = res.data;
  const brand = dataList.filter(
    (shoe) => shoe.brand === btnBrand && shoe.wishList === true
  );
  renderOperator(brand);
}

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

const container = document.getElementById("btn-brands-container");
let isDown = false;
let startX;
let scrollLeft;

container.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener("mouseleave", () => {
  isDown = false;
});

container.addEventListener("mouseup", () => {
  isDown = false;
});

container.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = x - startX;
  container.scrollLeft = scrollLeft - walk;
});

const buttons = document.querySelectorAll("#btn-brands button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");
  });
});

async function searchInputData() {
  const searchedProduct = searchInput.value;
  const res = await axios.get(
    "https://64861de3a795d24810b7b9b2.mockapi.io/products/Shoes"
  );
  const dataList = res.data;
  const result = dataList.filter(
    (shoe) =>
      (shoe.name === searchedProduct || shoe.brand === searchedProduct) &&
      shoe.wishList === true
  );
  if (result[0]) {
    renderOperator(result);
  } else {
    alert("No data matches your search, \n try again!.");
  }
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    while (productsElement.firstChild) {
      productsElement.removeChild(productsElement.firstChild);
    }
    searchInputData();
  }
});
