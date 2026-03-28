// 🟢 GET BUY NOW ITEM
const item = JSON.parse(localStorage.getItem("buyNow"));

const container = document.getElementById("item");

// 🟢 SHOW PRODUCT
if (!item) {
  container.innerHTML = "<h2>No product selected ❌</h2>";
} else {
  container.innerHTML = `
    <h3>${item.name}</h3>
    <img src="${item.image}" width="200"/>
    <p>Price: ₹${item.price}</p>
  `;
}

// 🟢 SHOW TOTAL
document.getElementById("total").innerText =
  "Total: ₹" + (item ? item.price : 0);


// 💳 RAZORPAY PAYMENT
function payNow() {
  if (!item) {
    alert("No item to purchase ❌");
    return;
  }

  const options = {
    key: "rzp_test_SSfbjt7z6btSQf", // ✅ YOUR KEY
    amount: item.price * 100, // paise
    currency: "INR",
    name: "Gym Store 💪",
    description: item.name,

    handler: function (response) {
      alert("Payment Successful ✅");

      console.log("Payment ID:", response.razorpay_payment_id);

      // clear buyNow
      localStorage.removeItem("buyNow");

      window.location.href = "index.html";
    },

    prefill: {
      name: "Customer",
      email: "test@gmail.com",
      contact: "9999999999"
    },

    theme: {
      color: "#ff0000"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}