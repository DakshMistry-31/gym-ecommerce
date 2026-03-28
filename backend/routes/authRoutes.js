const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) return res.status(400).json({ msg: "Invalid email" });

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign({ id: admin._id }, "secret123", {
    expiresIn: "1d"
  });

  res.json({ token });
});

module.exports = router;