const express = require('express');
const router = express.Router();
const Product = require('../DB/Product');
// Get Single Product
router.get('/single-product/:id', async (req, resp) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    resp.send(product);
  } else {
    resp.send({ message: 'Invalid product ID' });
  }
});
module.exports = router;