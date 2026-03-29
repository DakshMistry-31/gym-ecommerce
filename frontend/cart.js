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
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: ${item.qty}</p>
        <p>Total: ₹${item.price * item.qty}</p>
      </div>
    `;
  });

  document.getElementById("totalAmount").innerText = "Total: ₹" + total;
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
    amount: total * 100, // ₹ → paise
    currency: "INR",
    name: "Gym Store 💪",
    description: "Cart Payment",

    handler: function (response) {
      alert("Payment Successful 🎉");

      // clear cart
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

// =======================
loadCart();