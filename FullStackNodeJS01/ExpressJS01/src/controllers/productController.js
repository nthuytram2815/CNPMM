const Product = require('../models/product');
const getProductsByCategory = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;  // Phân trang
  const skip = (page - 1) * limit;
  const products = await Product.find({ category }).skip(skip).limit(parseInt(limit));
  const total = await Product.countDocuments({ category });
  res.json({ products, total, hasMore: skip + limit < total });
};
module.exports = { getProductsByCategory };