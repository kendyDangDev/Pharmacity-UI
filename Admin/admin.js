var content = document.querySelector(".content");
const btnCategory = document.getElementById("btn__category");
const btnProduct = document.getElementById("btn__product");

const categoryModal = document.getElementById("categoryModal");
const productModal = document.getElementById("productModal");
const closeCategoryModal = document.getElementById("closeCategoryModal");
const closeProductModal = document.getElementById("closeProductModal");

let categories = JSON.parse(localStorage.getItem("categories")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

let isEditing = false;
let editingIndex = null;

btnCategory.addEventListener("click", () => {
  content.innerHTML = `
    <h1>Category Page</h1>
    <h3>Category Page</h3>
    <div class="header">
        <div class="header__left">
      <p>Tất cả danh mục <b id="all__category"></b></p>
            <div class="search__bar" id="btn__search-category">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="categorySearchInput" placeholder="Tên thuốc, thực phẩm chức năng" />
            </div>
        </div>
        <button class="btn__add" id="btn__add-category">
            <i class="fa-solid fa-plus"></i>
            Thêm mới
        </button>
    </div>
    <div class="table-container">
      <table id="table__content" class="table__content table__contentcate">
        <thead>
          <tr>
            <th>ID</th>
            <th>Danh Mục</th>
            <th>Mô tả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody id="categoryTableBody">
          <!-- Dữ liệu danh mục sẽ được render tại đây -->
        </tbody>
      </table>
    </div>
    `;
  renderCategories();
  document.getElementById("btn__add-category").addEventListener("click", () => {
    categoryModal.style.display = "block";
    // isEditing = false;
    // editingIndex = null;
    document.getElementById("categoryName").value = "";
    document.getElementById("errorName").textContent = "";
    document.getElementById("categoryDescription").value = "";
    document.getElementById("errorDesc").textContent = "";
  });
  document
    .getElementById("categorySearchInput")
    .addEventListener("input", filterCategories);
});

btnProduct.addEventListener("click", () => {
  content.innerHTML = `
  <h1>Product Page</h1>
  <h3>Product Page</h3>
  <div class="header">
      <div class="header__left">
          <p>Tất cả sản phẩm <b id="all__product"></b></p>
          <div class="search__bar" id="btn__search-product">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" id="productSearchInput" placeholder="Tên thuốc, thực phẩm chức năng" />
          </div>
      </div>
      <button class="btn__add" id="btn__add-product">
          <i class="fa-solid fa-plus"></i>
          Thêm mới
      </button>
  </div>
  <div class="table-container">
    <table id="table__content" class="table__content table__contentpro">
        <thead>
            <tr>
                <th>ID</th>
                <th>Ảnh</th>
                <th>Tên thuốc</th>
                <th>Giá bán</th>
                <th>Thương hiệu</th>
                <th>Loại thuốc</th>
                <th>Thao tác</th>
            </tr>
        </thead>
        <tbody id="productTableBody">
            <!-- Dữ liệu sản phẩm sẽ được render tại đây -->
        </tbody>
    </table>
  </div>
  `;
  renderProducts();
  document.getElementById("btn__add-product").addEventListener("click", () => {
    populateCategoryOptions(); //load danh mục
    document.getElementById("productImagePreview").style.display = "none"; // Ẩn preview ảnh khi thêm mới
    productModal.style.display = "block";

    document.getElementById("productName").value = "";
    document.getElementById("errorNameProduct").textContent = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("errorPriceProduct").textContent = "";
    document.getElementById("productBrand").value = "";
    document.getElementById("errorBrand").textContent = "";
    document.getElementById("productCategory").value = "";
    document.getElementById("errorCategory").textContent = "";
    document.getElementById("productImage").value = "";
    document.getElementById("productImagePreview").src = "";
  });
  document
    .getElementById("productSearchInput")
    .addEventListener("input", filterProducts);
});

closeCategoryModal.addEventListener("click", () => {
  categoryModal.style.display = "none";
});

closeProductModal.addEventListener("click", () => {
  productModal.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == categoryModal) {
    categoryModal.style.display = "none";
  }
  if (event.target == productModal) {
    productModal.style.display = "none";
  }
};

function renderCategories() {
  const allCategory = document.getElementById("all__category");
  allCategory.innerHTML = `(${categories.length})`;

  const categoryTableBody = document.getElementById("categoryTableBody");
  categoryTableBody.innerHTML = "";
  categories.forEach((category, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${category.name}</td>
            <td>${category.description}</td>
            <td>
                <button onclick="editCategory(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="deleteCategory(${index})"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        `;
    categoryTableBody.appendChild(tr);
  });
}

function renderProducts() {
  const allProduct = document.getElementById("all__product");
  allProduct.innerHTML = `(${products.length})`;

  const productTableBody = document.getElementById("productTableBody");
  productTableBody.innerHTML = "";

  products.forEach((product, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${index + 1}</td>
          <td><img src="${product.image}" alt="${
      product.name
    }" width="50"/></td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.brand}</td>
          <td>${product.category}</td>
          <td>
              <button onclick="editProduct(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="deleteProduct(${index})"><i class="fa-solid fa-trash-can"></i></button>
          </td>
      `;
    productTableBody.appendChild(tr);
  });
}
function validateCategory(categoryName, categoryDescription) {
  const isValid = true;
  const nameErrorSpan = document.getElementById("errorName");
  if (categoryName === "") {
    nameErrorSpan.textContent = "Vui lòng nhập tên danh mục ";
    isValid = false;
  } else if (!isVietnameseString(categoryName)) {
    nameErrorSpan.textContent = "Tên danh mục không hợp lệ";
    isValid = false;
  } else {
    nameErrorSpan.textContent = "";
  }

  const descriptionErrorSpan = document.getElementById("errorDesc");
  if (categoryDescription === "") {
    descriptionErrorSpan.textContent = "Vui lòng nhập mô tả";
    isValid = false;
  } else {
    descriptionErrorSpan.textContent = "";
  }
  return isValid;
}

function saveCategory() {
  const categoryName = document.getElementById("categoryName").value.trim();
  const categoryDescription = document
    .getElementById("categoryDescription")
    .value.trim();

  if (validateCategory(categoryName, categoryDescription)) {
    if (isEditing) {
      categories[editingIndex] = {
        name: categoryName,
        description: categoryDescription,
      };
      isEditing = false;
      editingIndex = null;
    } else {
      categories.push({ name: categoryName, description: categoryDescription });
    }

    localStorage.setItem("categories", JSON.stringify(categories));
    renderCategories();
    categoryModal.style.display = "none";
  }
}
function isVietnameseString(str) {
  // Regex để kiểm tra chuỗi tiếng Việt không chứa ký tự đặc biệt
  const vietnameseRegex =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ0-9\s]+$/;

  return vietnameseRegex.test(str);
}
function validateProduct(
  productName,
  productPrice,
  productBrand,
  productCategory
) {
  let errorMessage = "";

  if (productName === "") {
    errorMessage = "Vui lòng nhập tên sản phẩm!";
    document.getElementById("errorNameProduct").textContent = errorMessage;
  } else if (!isVietnameseString(productName)) {
    errorMessage = "Tên sản phẩm không được chứa ký tự đặc biệt!";
    document.getElementById("errorNameProduct").textContent = errorMessage;
  } else {
    document.getElementById("errorNameProduct").textContent = "";
  }

  if (productPrice === "") {
    errorMessage = "Vui lòng nhập giá bán của sản phẩm!";
    document.getElementById("errorPriceProduct").textContent = errorMessage;
  } else if (isNaN(productPrice)) {
    errorMessage = "Giá bán không hợp lệ!";
    document.getElementById("errorPriceProduct").textContent = errorMessage;
  } else {
    document.getElementById("errorPriceProduct").textContent = "";
  }

  if (productBrand === "") {
    errorMessage = "Vui lòng nhập thương hiệu!";
    document.getElementById("errorBrand").textContent = errorMessage;
  } else if (!isVietnameseString(productBrand)) {
    errorMessage = "Thương hiệu không được chứa ký tự đặc biệt!";
    document.getElementById("errorBrand").textContent = errorMessage;
  } else {
    document.getElementById("errorBrand").textContent = "";
  }

  if (productCategory === "") {
    errorMessage = "Vui lòng chọn danh mục!";
    document.getElementById("errorCategory").textContent = errorMessage;
  } else {
    document.getElementById("errorCategory").textContent = "";
  }

  if (errorMessage !== "") {
    return false;
  } else {
    return true;
  }
}
function saveProduct() {
  const productName = document.getElementById("productName").value.trim();
  const productPrice = document.getElementById("productPrice").value.trim();
  const productBrand = document.getElementById("productBrand").value.trim();
  const productCategory = document
    .getElementById("productCategory")
    .value.trim();
  const productImage = document.getElementById("productImage").files[0];
  if (
    validateProduct(productName, productPrice, productBrand, productCategory)
  ) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const productData = {
        name: productName,
        price: productPrice,
        brand: productBrand,
        category: productCategory,
        image: e.target.result, //lấy đc đường dẫn của ảnh
      };

      if (isEditing) {
        products[editingIndex] = productData;
        isEditing = false;
        editingIndex = null;
      } else {
        products.push(productData);
      }

      localStorage.setItem("products", JSON.stringify(products));
      renderProducts();
      productModal.style.display = "none";
    };

    if (productImage) {
      reader.readAsDataURL(productImage);
    } else {
      const productData = {
        name: productName,
        price: productPrice,
        brand: productBrand,
        category: productCategory,
        image: products[editingIndex]?.image || "path/to/default/image",
      };

      if (isEditing) {
        products[editingIndex] = productData;
        isEditing = false;
        editingIndex = null;
      } else {
        products.push(productData);
      }

      localStorage.setItem("products", JSON.stringify(products));
      renderProducts();
      productModal.style.display = "none";

      console.log("dsds");
    }
  }

  // console.log(productImage);

  // if (
  //   productName === "" ||
  //   productPrice === "" ||
  //   productBrand === "" ||
  //   productCategory === ""
  // )
  //   return;
}

function populateCategoryOptions() {
  const productCategorySelect = document.getElementById("productCategory");
  productCategorySelect.innerHTML = "";

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name;
    productCategorySelect.appendChild(option);
  });
}

document.getElementById("saveCategory").addEventListener("click", saveCategory);
document.getElementById("saveProduct").addEventListener("click", saveProduct);

document
  .getElementById("productImage")
  .addEventListener("change", function (event) {
    const productImagePreview = document.getElementById("productImagePreview");
    const productImage = event.target.files[0];

    if (productImage) {
      const reader = new FileReader();
      reader.onload = function (e) {
        productImagePreview.src = e.target.result;
        productImagePreview.style.display = "block";
      };
      reader.readAsDataURL(productImage);
    } else {
      productImagePreview.src = "";
      productImagePreview.style.display = "none";
    }
  });

window.editCategory = function (index) {
  const category = categories[index];
  document.getElementById("categoryName").value = category.name;
  document.getElementById("categoryDescription").value = category.description;
  categoryModal.style.display = "block";
  isEditing = true;
  editingIndex = index;
};

window.deleteCategory = function (index) {
  if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
    categories.splice(index, 1);
    localStorage.setItem("categories", JSON.stringify(categories));
    renderCategories();
  }
};

window.editProduct = function (index) {
  const product = products[index];
  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productBrand").value = product.brand;
  populateCategoryOptions();
  document.getElementById("productCategory").value = product.category;
  document.getElementById("productImagePreview").src = product.image;
  document.getElementById("productImagePreview").style.display = "block";
  productModal.style.display = "block";
  isEditing = true;
  editingIndex = index;
};

window.deleteProduct = function (index) {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
};

function filterCategories() {
  const searchValue = document
    .getElementById("categorySearchInput")
    .value.toLowerCase();
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchValue)
  );
  renderFilteredCategories(filteredCategories);
}

function renderFilteredCategories(filteredCategories) {
  const categoryTableBody = document.getElementById("categoryTableBody");
  categoryTableBody.innerHTML = "";
  filteredCategories.forEach((category, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${category.name}</td>
        <td>${category.description}</td>
        <td>
          <button onclick="editCategory(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="deleteCategory(${index})"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      `;
    categoryTableBody.appendChild(tr);
  });
}

function filterProducts() {
  const searchValue = document
    .getElementById("productSearchInput")
    .value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchValue)
  );
  renderFilteredProducts(filteredProducts);
}

function renderFilteredProducts(filteredProducts) {
  const productTableBody = document.getElementById("productTableBody");
  productTableBody.innerHTML = "";
  filteredProducts.forEach((product, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td><img src="${product.image}" alt="${product.name}" width="50"/></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.brand}</td>
        <td>${product.category}</td>
        <td>
          <button onclick="editProduct(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="deleteProduct(${index})"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      `;
    productTableBody.appendChild(tr);
  });
}
