const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String  // e.g., 'electronics'
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;