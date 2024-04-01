const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User.js");

const router = express.Router();

//kullanıcı oluşturma ( create- register)

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
