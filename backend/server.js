const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ VERY IMPORTANT (must be before routes)
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server + DB running 🚀");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// ✅ FIXED PORT FOR DEPLOYMENT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});