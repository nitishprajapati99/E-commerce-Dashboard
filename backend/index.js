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
// const UpdatePwdroute = require('./Routes/UpdatepwdRoute');
// import decryptUser from './DB/decryptionUser.js';



const app = express();
// const jwtkey = 'e-comm';

// Middleware
app.use(express.json());
app.use(cors());

// ========================
// 🔐 User Routes
// ========================

// Register Route
//import 
const signupRouter = require('./Routes/SignupRoute');
//using the route
app.use('/user',signupRouter);



//Login Route
const LoginRoute = require('./Routes/LoginRoute');
app.use('/user',LoginRoute);


//Routes For Forgot Password
const ForgotRouter = require('./Routes/ForgotPwd');
app.use('/user',ForgotRouter);


//This route is for update the password
const Resetpwd =require('./Routes/ResetPwd');
app.use('/user',Resetpwd);


// ========================
// 📦 Product Routes
// ========================

// Add Product
const AddPruductRoute = require('./Routes/AddproductRoute');
app.use('/product',AddPruductRoute);

//productList
const ProductListRoute = require('./Routes/ProductListRoute');
app.use('/product', ProductListRoute);

// Delete Product
const DeleteProductRoute = require('./Routes/DeleteProductRoute');
app.use('/product',DeleteProductRoute);

// // Get Single Product

const SingleProductRoute = require('./Routes/SingleProductRoute');
app.use('/product',SingleProductRoute);


// Update Product
const UpdateProductRoute = require('./Routes/UpdateProductRoute');
app.use('/product',UpdateProductRoute);

//Search Product 
const SearchProductRoute = require('./Routes/SearchProductRoute');
app.use('/product',SearchProductRoute);

// ========================
// 🚀 Start Server
// ========================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
