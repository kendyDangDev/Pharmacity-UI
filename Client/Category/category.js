const productSections = document.querySelectorAll(".deals-super__product");
const products = [];

productSections.forEach((section) => {
  const productName = section.querySelector(".product-name span").textContent;
  const productPrice = parseFloat(
    section
      .querySelector(".product-price strong")
      .textContent.replace(/[^0-9]/g, "")
  );
  products.push({
    name: productName,
    price: productPrice,
    section: section.cloneNode(true), // Clone the section to retain all HTML structure
  });
});

const sortAscButton = document.getElementById("sort_Asc");
const sortDescButton = document.getElementById("sort_Desc");

sortAscButton.addEventListener("click", () => {
  products.sort((a, b) => a.price - b.price);
  updateProductDisplay();
  sortAscButton.classList.add("sort__active");
  sortDescButton.classList.remove("sort__active");
});

sortDescButton.addEventListener("click", () => {
  products.sort((a, b) => b.price - a.price);
  updateProductDisplay();
  sortAscButton.classList.remove("sort__active");
  sortDescButton.classList.add("sort__active");
});

function updateProductDisplay() {
  const container = document.querySelector(".deals-super__product").parentNode;
  container.innerHTML = ""; // Clear the existing product sections
  products.forEach((product) => {
    container.appendChild(product.section); // Append the sorted sections
  });
}
