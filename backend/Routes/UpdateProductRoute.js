const express = require('express');
const router = express.Router();
const Product = require('../DB/Product');
const verifyToken = require('../utils/VerifyToken');



// Update Product
router.put('/update-product/:id', verifyToken, async (req, resp) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  console.log(result);
  resp.send(result);
});



module.exports = router;