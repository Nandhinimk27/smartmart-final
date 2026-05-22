const express = require("express");

const {
  addToCart,
  getCartItems,
  updateCartQuantity,
  removeCartItem,
  clearCart
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addToCart);

router.get("/:userId", getCartItems);

router.put("/:id", updateCartQuantity);

router.delete("/clear/:userId", clearCart);

router.delete("/:id", removeCartItem);

module.exports = router;