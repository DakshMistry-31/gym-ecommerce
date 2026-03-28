const token = localStorage.getItem("token");

if (!token || token === "undefined") {
  alert("Unauthorized access!");
  window.location.href = "login.html";
}

const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

let editId = null;

// LOAD PRODUCTS
async function loadProducts() {
  const res = await fetch("http://localhost:5000/api/products");
  const data = await res.json();

  productList.innerHTML = "";

  data.forEach(p => {
    productList.innerHTML += `
      <div style="border:1px solid red; margin:10px; padding:10px">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="editProduct('${p._id}')">Edit</button>
        <button onclick="deleteProduct('${p._id}')">Delete</button>
      </div>
    `;
  });
}

// ADD / UPDATE PRODUCT
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    name: name.value,
    price: Number(price.value),
    image: image.value,
    description: description.value,
    category: category.value,
    stock: Number(stock.value)
  };

  if (editId) {
    // UPDATE
    await fetch(`http://localhost:5000/api/products/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });

    alert("Updated ✅");
    editId = null;

  } else {
    // ADD
    await fetch("http://localhost:5000/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });

    alert("Added ✅");
  }

  form.reset();
  loadProducts();
});

// DELETE
async function deleteProduct(id) {
  await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "DELETE"
  });

  alert("Deleted ❌");
  loadProducts();
}

// EDIT
async function editProduct(id) {
  const res = await fetch("http://localhost:5000/api/products");
  const data = await res.json();

  const p = data.find(item => item._id === id);

  name.value = p.name;
  price.value = p.price;
  image.value = p.image;
  description.value = p.description;
  category.value = p.category;
  stock.value = p.stock;

  editId = id;
}

loadProducts();

function logout() {
  localStorage.removeItem("token");
  alert("Logged out successfully");
  window.location.href = "login.html";
}