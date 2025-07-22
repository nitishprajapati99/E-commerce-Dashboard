require('dotenv').config();
require('./DB/config');

const { body, validationResult } = require('express-validator');
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
// const CryptoJS = require('crypto-js');
const User = require('./DB/Users');
const Product = require('./DB/Product');
const UpdatePwdroute = require('./Routes/UpdatepwdRoute');
// import decryptUser from './DB/decryptionUser.js';



const app = express();
const jwtkey = 'e-comm';

// Middleware
app.use(express.json());
app.use(cors());

// ========================
// 🔐 User Routes
// ========================

// Register Route
app.post('/register', async (req, resp) => {
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

    Jwt.sign({ user }, jwtkey, { expiresIn: '2h' }, (err, token) => {
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


// Login Route
app.post('/login', async (req, resp) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return resp.status(400).send({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return resp.status(404).send({ message: "User not found" });
    }

    const pwdMatch = await bcrypt.compare(password, user.password);
    if (!pwdMatch) {
      return resp.status(401).send({ message: "Invalid credentials" });
    }

    Jwt.sign({ user }, jwtkey, { expiresIn: '2h' }, (err, token) => {
      if (err) {
        return resp.status(500).send({ message: "Something went wrong" });
      }
      resp.send({ user, auth: token });
    });
  } catch (err) {
    console.error("Login error:", err);
    resp.status(500).send({ message: "Internal server error" });
  }
});



//Routes For Forgot Password
app.post('/forgotpwd', async (req, resp) => {
  let { email } = req.body;
  console.log(email);


  // try {

  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {

    resp.status(404).send({
      message: 'user is not found'
    })
  } else {
    resp.status(200).send({
      message: 'email id is valid'
    });
  }

  // } catch {
  //   resp.status(400).send('Here some technical fault try again later');
  // }


});



//This route is for update the password

app.post('/updatepwd/:email', async (req, resp) => {
  let { password } = req.body;
  const email = req.params.email;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  password = hashedPassword;
  console.log(password);
  try {
    if (!password) {
      resp.status(404).send({
        message: 'password not rech to the backend'
      })
    } else {
      const result = await User.updateOne(
        { email: req.params.email },
        { $set: { password } }

      )
      resp.status(200).send(result);
    }
  }
  catch (err) {
    console.log('The error is', err);
    resp.status(400).send({
      message: 'Some Technical error'
    })
  }
})

// ========================
// 📦 Product Routes
// ========================

// Add Product
app.post('/add-product', verifyToken, async (req, resp) => {
  const product = new Product(req.body);
  const savedProduct = await product.save();
  console.log(`Product added: ${savedProduct}`);
  resp.send(savedProduct);
});

// Get All Products
app.get('/product-list', verifyToken, async (req, resp) => {
  const products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No products found" });
  }
});

// Delete Product
app.delete('/delete-product/:_id', verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params._id });
  resp.send(result);
});

// Get Single Product
app.get('/single-product/:id', async (req, resp) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    resp.send(product);
  } else {
    resp.send({ message: 'Invalid product ID' });
  }
});

// Update Product
app.put('/update-product/:id', verifyToken, async (req, resp) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  console.log(result);
  resp.send(result);
});

// Search Product
app.get('/search-product/:search', verifyToken, async (req, resp) => {
  const result = await Product.find({
    "$or": [
      { productName: { $regex: req.params.search, $options: 'i' } },
      { productType: { $regex: req.params.search, $options: 'i' } },
      { brand: { $regex: req.params.search, $options: 'i' } }
    ]
  });

  if (result.length > 0) {
    resp.send({
      status: 200,
      success: true,
      data: result,
      message: 'Data fetched successfully'
    });
  } else {
    resp.send({
      status: 200,
      success: false,
      data: [],
      message: "No products found."
    });
  }
});

// ========================
// 🛡️ JWT Middleware
// ========================
function verifyToken(req, resp, next) {
  const tokenHeader = req.headers['authorization'];

  if (tokenHeader) {
    const token = tokenHeader.split(' ')[1];

    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        return resp.status(403).send({ result: 'Invalid token' });
      } else {
        req.user = valid;
        next();
      }
    });
  } else {
    resp.status(401).send({ result: 'Authorization token missing' });
  }
}

// ========================
// 🚀 Start Server
// ========================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
