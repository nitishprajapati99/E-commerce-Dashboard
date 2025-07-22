const express = require('express');
const Product = require('../DB/Product');
const router = express.Router();
const verifyToken = require('../utils/VerifyToken');
router.get('/product-list', verifyToken, async (req, resp) => {
  const products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No products found" });
  }
});
module.exports = router;