const express = require("express");

const {
  createProduct,
  addManyProducts,
  updateProductImages,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const router = express.Router();

router.post("/many", addManyProducts);

router.put("/images/update", updateProductImages);

router.post("/", createProduct);

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;