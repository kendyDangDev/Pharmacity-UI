var btnIncreasee = document.getElementById("btn__increase");
var btnReduce = document.getElementById("btn__reduce");
var currentQuantity = document.getElementById("currentQuantity");
var newQuantity = parseInt(currentQuantity.textContent);

btnIncreasee.addEventListener("click", () => {
  newQuantity++;
  currentQuantity.textContent = newQuantity;
});

btnReduce.addEventListener("click", () => {
  if (newQuantity > 0) {
    newQuantity--;
    currentQuantity.textContent = newQuantity;
  }
});

// var btnCategory = document.querySelector(".header-category__btn");
// var categoryDisplay = document.querySelector(".category__main-container");
// var arrow = document.querySelector(".rotate_ar");

// btnCategory.addEventListener("click", function () {
//   if (categoryDisplay.style.opacity == 0) {
//     categoryDisplay.style.opacity = 1;
//     categoryDisplay.style.visibility = "visible";
//     arrow.style.transform = "rotate(180deg)";
//   } else {
//     categoryDisplay.style.opacity = 0;
//     categoryDisplay.style.visibility = "hidden";
//     arrow.style.transform = "rotate(0deg)";
//   }
// });

// var btnLogin = document.querySelector(".header__Sign__btn");
// var modalLogin = document.getElementById("modal-Login");
// btnLogin.addEventListener("click", () => {
//   modalLogin.style.display = "block";
// });

// var closeModal = document.getElementById("closeModal");
// closeModal.addEventListener("click", () => {
//   modalLogin.style.display = "none";
// });

// var phoneNumber = document.querySelector(".modal-Login input");
// var continueActive = document.getElementById("continueActive");

// phoneNumber.addEventListener("input", () => {
//   const phoneValue = phoneNumber.value;
//   if (!isNaN(phoneValue)) {
//     phoneNumber.value = phoneValue;
//   } else {
//     phoneNumber.value = phoneValue.slice(0, -1);
//   }

//   if (phoneValue.length === 10) {
//     continueActive.classList.add("btn_active");
//     continueActive.addEventListener("click", () => {
//       modalLogin.style.display = "none";
//     });
//   } else {
//     continueActive.classList.remove("btn_active");
//   }
// });
