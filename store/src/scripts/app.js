"use strict";

const container = document.getElementById("container"),
  searchInput = document.getElementById("search-input"),
  productsElement = document.querySelector(".products");
function summarizeName(name) {
  if (name.length > 10) {
    return name.slice(0, 10) + "...";
  }
  return name;
}
function getGreeting() {
  const time = new Date();
  const hour = time.getHours();
  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return greeting;
}
document.querySelector("#greeting").textContent = `${getGreeting()} 👋`;

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

axios
  .get("https://64861de3a795d24810b7b9b2.mockapi.io/products/Shoes")
  .then((response) => {
    const data = response.data;
    renderOperator(data)
  });

let pages = document.querySelectorAll(".other-pages-layout");
let pagesCollection = document.getElementsByClassName("other-pages-layout");
console.log(pagesCollection);
pages.forEach((page) => {
  page.addEventListener("click", () => {
    if (page.classList.contains("Home")) {
      console.log("You are in home page.");
    } else if (page.classList.contains("Cart")) {
      window.location.href = "http://127.0.0.1:5500/store/cart.html";
    } else if (page.classList.contains("Orders")) {
      window.location.href = "http://127.0.0.1:5500/store/orders.html";
    } else if (page.classList.contains("Wallet")) {
      window.location.href = "http://127.0.0.1:5500/store/wallet.html";
    } else if (page.classList.contains("Profile")) {
      window.location.href = "http://127.0.0.1:5500/store/profile.html";
    }
  });
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

async function renderByBrand(btnBrand) {
  while (productsElement.firstChild) {
    productsElement.removeChild(productsElement.firstChild);
  }
  const res = await axios.get(
    "https://64861de3a795d24810b7b9b2.mockapi.io/products/Shoes"
  );
  const dataList = res.data;
  const brand = dataList.filter((shoe) => shoe.brand === btnBrand);
  renderOperator(brand);
}

buttons.forEach((elem) => {
  elem.addEventListener('click', () => {
    renderByBrand(elem.value);
  })
})