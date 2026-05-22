const Product = require("../models/Product");

const getLowStockProducts = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      stock: { $lte: 5 }
    });

    res.status(200).json({
      message: "Low stock products fetched successfully",
      count: lowStockProducts.length,
      products: lowStockProducts
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getLowStockProducts
};