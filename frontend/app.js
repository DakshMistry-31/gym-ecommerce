// =======================
// 🟢 LOAD PRODUCTS
// =======================
async function loadProducts() {
  try {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();

    const container = document.getElementById("products");
    if (!container) return;

    container.innerHTML = "";

    data.forEach(p => {
      container.innerHTML += `
        <div style="border:1px solid red; margin:10px; padding:10px; border-radius:10px;">
          <img src="${p.image}" width="200"/>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <h4>₹${p.price}</h4>

          <button onclick='addToCart(${JSON.stringify(p)})'>
            🛒 Add to Cart
          </button>

          <button onclick='buyNow(${JSON.stringify(p)})'>
            ⚡ Buy Now
          </button>
        </div>
      `;
    });

  } catch (err) {
    console.log("Error loading products:", err);
  }
}

loadProducts();


// =======================
// 🛒 ADD TO CART
// =======================
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(p => p._id === product._id);

  if (existing) {
    existing.qty += 1;
  } else {
    product.qty = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart 🛒");
}


// =======================
// ⚡ BUY NOW
// =======================
function buyNow(product) {
  const order = {
    ...product,
    qty: 1
  };

  localStorage.setItem("buyNow", JSON.stringify(order));

  window.location.href = "checkout.html";
}


// =======================
// 🔐 GOOGLE LOGIN
// =======================
function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);

  localStorage.setItem("user", JSON.stringify(data));

  alert("Welcome " + data.name);

  showUser();
}


// =======================
// 🧠 PARSE JWT
// =======================
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = atob(base64Url.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(base64);
}


// =======================
// 👤 SHOW USER UI
// =======================
function showUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // ❌ Hide Google button
    const btn = document.getElementById("googleBtn");
    if (btn) btn.style.display = "none";

    let existing = document.getElementById("userInfo");

    if (!existing) {
      const div = document.createElement("div");
      div.id = "userInfo";
      div.style.color = "white";
      div.style.margin = "10px";

      div.innerHTML = `
        👋 Welcome ${user.name}
        <br>
        <img src="${user.picture}" width="50" style="border-radius:50%">
        <br><br>
        <a href="cart.html" style="color:white;">🛒 Go to Cart</a>
        <br><br>
        <button onclick="logoutUser()">Logout</button>
      `;

      document.body.prepend(div);
    }
  }
}


// =======================
// 🚪 LOGOUT
// =======================
function logoutUser() {
  localStorage.removeItem("user");

  // show button again
  const btn = document.getElementById("googleBtn");
  if (btn) btn.style.display = "block";

  alert("Logged out");
  location.reload();
}


// =======================
// 🔄 AUTO LOAD USER
// =======================
showUser();