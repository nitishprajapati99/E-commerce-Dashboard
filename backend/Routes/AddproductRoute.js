require('dotenv').config();
require('../DB/config');

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const Product = require('../DB/Product');

const router= express.Router()
// Add Product
const verifyToken = require('../utils/VerifyToken');
router.post('/add-product', verifyToken, async (req, resp) => {
  const product = new Product(req.body);
  const savedProduct = await product.save();
  console.log(`Product added: ${savedProduct}`);
  resp.send(savedProduct);
});

module.exports = router;