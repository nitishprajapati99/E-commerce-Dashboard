require('dotenv').config();
require('../DB/config');

const { body, validationResult } = require('express-validator');
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcryptjs'); 
const Jwt = require('jsonwebtoken');

const User = require('../DB/Users');
const router = express.Router();
// Register Router
const SECRET_KEY = 'my_super_secret_key_32_chars__'; // 32-char key
router.post('/register', async (req, resp) => {
  try {
    let user = new User(req.body);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return resp.status(400).send({ message: "User already registered with this email" });
    }


    const result = await user.save();

    Jwt.sign({ user }, SECRET_KEY, { expiresIn: '2h' }, (err, token) => {
      if (err) {
        return resp.status(500).send({ result: "Something went wrong. Try again later." });
      }
      resp.status(200).send({ result, auth: token });
    });
  } catch (err) {
    console.error("Save error:", err);
    resp.status(500).send("Failed to register user");
  }
});


module.exports = router;