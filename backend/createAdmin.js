const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  const hashed = await bcrypt.hash("123456", 10);

  await Admin.create({
    email: "admin@gmail.com",
    password: hashed
  });

  console.log("Admin created ✅");
  process.exit();
}

createAdmin();