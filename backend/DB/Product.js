const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName:String,
    productPrice:Number,
    productType:String,
    brand:String,
    userid:String
})
module.exports = mongoose.model('product', ProductSchema);