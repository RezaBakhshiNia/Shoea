"use strict";

import "https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js";

let users = [];

axios
  .get("https://646f9b4809ff19b120878e0e.mockapi.io/api/done/users")
  .then((response) => {
    users = response.data;
    console.log(users);
  })
  .catch((error) => {
    console.log(error);
  });

const userID = document.getElementById("input1"),
  password = document.getElementById("input2"),
  loginBtn = document.getElementById("login");

const visibilityIcon = document.getElementById("visibility-icon");
const visibilityOffIcon = document.getElementById("visibility-off-icon");

visibilityIcon.addEventListener("click", () => {
  password.type = "text";
  visibilityIcon.style.display = "none";
  visibilityOffIcon.style.display = "inline-block";
});

visibilityOffIcon.addEventListener("click", () => {
  password.type = "password";
  visibilityOffIcon.style.display = "none";
  visibilityIcon.style.display = "inline-block";
});

function checkUsername(username) {
  return users.some((user) => user.userName === username);
}

function checkPassword(password) {
  return users.some((user) => user.password === password);
}

function currentUser(username) {
  return users.find((user) => user.userName === username);
}

loginBtn.addEventListener("click", function (event) {
  if (checkUsername(userID.value) && checkPassword(password.value)) {
    // loading.style.display = "flex";
    const userIDValue = userID.value;
    const currentUserObj = currentUser(userIDValue);
    console.log(currentUserObj);

    axios
      .post(
        "https://646f9b4809ff19b120878e0e.mockapi.io/api/done/Done",
        currentUserObj
      )
      .then((response) => {
        alert("Entering...");
        window.location.href = "http://127.0.0.1:5500/store/homePage.html";
      })
      .catch((error) => {
        console.log(error);
        alert("Error creating user");
      });
  } else {
    alert('something got wrong.')
  }
});

const myInputs = document.getElementsByClassName("inputs");

Array.from(myInputs).forEach((element) => {
  element.addEventListener("click", function () {
    const myDiv = element.parentNode;
    element.style.color = "black";
    myDiv.querySelector("p").classList.toggle("active");
    myDiv.querySelector("svg").classList.toggle("active");
  });
});

$(".form").on("click", function () {
  const myInput = $(this).find(".inputs");
  $(this).css("border", "1px solid black");
  myInput.focus();
});

$(".inputs").on("blur", function () {
  const form = $(this).parent(".form");
  form.css("border", "none");
});

$(".inputs").on("keydown", function (event) {
  if (event.key === "Tab") {
    const form = $(this).parent(".form");
    myDiv.css("border", "none");
  }
});
