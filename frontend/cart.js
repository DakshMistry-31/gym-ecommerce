// =======================
// 🛒 LOAD CART ITEMS
// =======================
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const container = document.getElementById("cartItems");
  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div style="border:1px solid red; margin:10px; padding:10px;">
        <h3>${item.name || item.category || "Product"}</h3>

        <p>Price: ₹${item.price}</p>

        <div>
          <button onclick="updateQty('${item._id}', -1)">➖</button>
          <span>${item.qty}</span>
          <button onclick="updateQty('${item._id}', 1)">➕</button>
        </div>

        <p>Total: ₹${item.price * item.qty}</p>

        <button onclick="removeItem('${item._id}')">❌ Remove</button>
      </div>
    `;
  });

  document.getElementById("totalAmount").innerText = "Total: ₹" + total;
}


// =======================
// ➕➖ UPDATE QTY
// =======================
function updateQty(id, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.map(item => {
    if (item._id === id) {
      item.qty += change;

      if (item.qty < 1) item.qty = 1;
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}


// =======================
// ❌ REMOVE ITEM
// =======================
function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(item => item._id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}


// =======================
// 💳 RAZORPAY PAYMENT
// =======================
function payNow() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty ❌");
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
  });

  const options = {
    key: "rzp_test_SSfbjt7z6btSQf",
    amount: total * 100,
    currency: "INR",
    name: "Gym Store 💪",
    description: "Cart Payment",

    handler: function (response) {
      alert("Payment Successful 🎉");

      localStorage.removeItem("cart");

      window.location.href = "success.html";
    },

    theme: {
      color: "#ff0000"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}

loadCart();