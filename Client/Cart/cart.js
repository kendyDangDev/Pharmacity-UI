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