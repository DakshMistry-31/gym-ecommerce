const cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cartItems");
let total = 0;

cart.forEach(p => {
  total += p.price * p.qty;

  container.innerHTML += `
    <div>
      <h3>${p.name}</h3>
      <p>₹${p.price} x ${p.qty}</p>
    </div>
  `;
});

document.getElementById("total").innerText = "Total: ₹" + total;