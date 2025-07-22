const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const Product = require('../DB/Product');
const router = express.Router();
const verifyToken = require('../utils/VerifyToken');

// Get All Products
router.delete('/delete-product/:_id', verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params._id });
  resp.send(result);
});

module.exports = router;