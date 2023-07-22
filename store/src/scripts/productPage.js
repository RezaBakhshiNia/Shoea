"use strict";

const id = +window.location.search.slice(1);
console.log(id);

async function getData() {
  try {
    const response = await axios.get(
      "https://64861de3a795d24810b7b9b2.mockapi.io/products/Shoes"
    );
    const allTheData = response.data;
    console.log(allTheData);
    renderByID(allTheData, id);
    return allTheData;
  } catch (error) {
    console.error(error);
  }
}

const data = getData();
data
  .then((data) => {
    // set the base price
    var basePrice = data[id - 1].price;
    console.log(basePrice);
    // update the price displayed on the page
    let totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.innerHTML = basePrice;

    // add click event listeners to the increment and decrement buttons
    let incrementButton = document.getElementById("increment");
    let decrementButton = document.getElementById("decrement");
    let valueElement = document.getElementById("value");

    incrementButton.addEventListener("click", () => {
      let value = parseInt(valueElement.innerHTML);
      value++;
      valueElement.innerHTML = value;
      totalPriceElement.innerHTML = basePrice * value;
    });

    decrementButton.addEventListener("click", () => {
      let value = parseInt(valueElement.innerHTML);
      if (value > 1) {
        value--;
        valueElement.innerHTML = value;
        totalPriceElement.innerHTML = basePrice * value;
      }
    });
    document.getElementById("add-to-cart").addEventListener("click", () => {
      const selectedColor = document.querySelector(".colors .selectedColor")
        .style.backgroundColor;
      const selectedSize = parseFloat(
        document.querySelector(".sizes .selectedSize").textContent
      );
      const dataSet = parseInt(
        document.querySelector(".product").getAttribute("data-set")
      );
      const nameOfProduct = document
        .getElementById("nameOfProduct")
        .textContent.trim();
      const count = +document.querySelector("#value").textContent;
      // Append the values to the object
      const item = {
        id: id,
        name: nameOfProduct,
        color: selectedColor,
        finalPrice: +totalPriceElement.innerHTML,
        startPrice: basePrice,
        size: selectedSize,
        imgLocation: document.querySelector("img").src,
        count: count,
      };

      axios
        .post("https://64861de3a795d24810b7b9b2.mockapi.io/products/Cart", item)
        .then((response) => {
          console.log("Item added to cart:", response.data);
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
        });

      console.log(item);
    });
  })
  .catch((error) => {
    console.error("Error fetching price:", error);
  });

function renderByID(Datas, Id) {
  const data = Datas[Id - 1];

  if (data.available) {
    document.querySelector("title").textContent = data.name;
    document.querySelector(".product").setAttribute("data-set", data.id);
    document.querySelector("img").src = data.image[0];
    document.querySelector("#nameOfProduct").textContent = data.name;
    document.querySelector("svg").setAttribute("data-set", data.id);
    setRating(data.rate);
    document.querySelector(".sold").textContent = `${formatNumber(
      data.sold
    )} sold`;
    document.querySelector(".reviews").textContent = `${
      data.rate
    } (${formatNumber(data.reviews)} reviews)`;
    document.querySelector("#describe").textContent = data.description;
    document.querySelector(".colors").innerHTML = createColorSpans(
      data.color
    ).innerHTML;
    document.querySelector(".sizes").innerHTML = createSizeSpans(
      data.size
    ).innerHTML;
    document.querySelector("#totalPrice").textContent = multiplyPrice(
      1,
      `${data.price}`
    );
    if (data.wishList) {
      document.querySelector(".heart-icon").classList.add("clicked");
    }
  } else {
    document.querySelector("title").textContent = data.name;
    document.querySelector(".product").setAttribute("data-set", data.id);
    document.querySelector("img").src = data.image[0];
    document.querySelector("#nameOfProduct").textContent = data.name;
    document.querySelector("svg").setAttribute("data-set", data.id);
    setRating(data.rate);
    document.querySelector(".sold").textContent = `${formatNumber(
      data.sold
    )} sold`;
    document.querySelector(".reviews").textContent = `${
      data.rate
    } (${formatNumber(data.reviews)} reviews)`;
    document.querySelector("#describe").textContent = data.description;

    document.querySelector(".size-color").style.display = 'none';
    document.querySelector(".sizes").style.display = 'none';
    document.querySelector("#totalPrice").style.display = 'none';
    document.querySelector('.totalPrice-addToCart').style.display = 'none';
    document.querySelector('.quantity').style.display = 'none';

    if (data.wishList) {
      document.querySelector(".heart-icon").classList.add("clicked");
    }
  }
}

const heartIcon = document.querySelector(".heart-icon");
heartIcon.addEventListener("click", function (event) {
  if (!this.classList.contains("clicked")) {
    this.classList.add("clicked");
    async function updateProductWishList(id) {
      const res = await axios.get(
        `https://64861de3a795d24810b7b9b2.mockapi.io/products/Shoes/${id}`
      );
      const productData = res.data;
      console.log(productData);
    }
    updateProductWishList(id);
  } else {
    alert("It was add to wish list.");
  }
});

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function selectSize() {
  const sizes = document.querySelectorAll(".size");
  sizes.forEach((size) => {
    size.addEventListener("click", () => {
      // remove "selected" class from all sizes
      sizes.forEach((s) => s.classList.remove("selectedSize"));

      // add "selectedSize" class to the clicked size
      size.classList.add("selectedSize");
    });
  });
}
function selectColor() {
  const colorSpans = document.querySelectorAll(".color");
  colorSpans.forEach((color) => {
    color.addEventListener("click", () => {
      // remove "selected" class from all colorSpans
      colorSpans.forEach((s) => s.classList.remove("selectedColor"));

      // add "selectedColor" class to the clicked color
      color.classList.add("selectedColor");
    });
  });
}

function createColorSpans(arrayOfColors) {
  const container = document.createElement("div");
  container.classList.add("colors");

  arrayOfColors.forEach((color) => {
    const span = document.createElement("span");
    span.style.backgroundColor = color;
    span.classList.add(`color`);
    container.appendChild(span);
  });

  return container;
}
function createSizeSpans(arrayOfSizes) {
  const container = document.createElement("div");
  container.classList.add("sizes");

  arrayOfSizes.forEach((size) => {
    const span = document.createElement("span");
    span.textContent = size;
    span.classList.add(`size`);
    container.appendChild(span);
  });

  return container;
}

function multiplyPrice(number, priceString) {
  const price = parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
  const multipliedPrice = number * price;
  const formattedPrice = "$" + multipliedPrice.toFixed(2);
  return formattedPrice;
}

function setRating(rating) {
  const starFill = document.querySelector(".star-fill");
  // Calculate the percentage to fill based on the rating
  const percentage = (rating / 7) * 100;
  // Set the width of the star fill element
  starFill.style.width = `${percentage}%`;
}
