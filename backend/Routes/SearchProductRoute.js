const express = require('express');
const router = express.Router();
const Product = require('../DB/Product');
const verifyToken = require('../utils/VerifyToken');
// Search Product
router.get('/search-product/:search', verifyToken, async (req, resp) => {
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

module.exports = router;