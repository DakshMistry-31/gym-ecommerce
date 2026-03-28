async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Trying login..."); // DEBUG

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  console.log("Response:", data); // DEBUG

  if (data.token) {
    localStorage.setItem("token", data.token);

    alert("Login successful ✅");

    // 🔥 REDIRECT
    window.location.href = "admin.html";

  } else {
    alert("Login failed ❌");
  }
}