const Cart = require("../models/Cart");

// Add product to cart
const addToCart = async (req, res) => {
  try {

    const {
      userId,
      productId,
      name,
      price,
      image
    } = req.body;

    // Check if product already exists
    const existingItem = await Cart.findOne({
      userId,
      productId
    });

    if (existingItem) {

      existingItem.quantity += 1;

      await existingItem.save();

      return res.status(200).json({
        message: "Quantity updated",
        cartItem: existingItem
      });
    }

    // Create new cart item
    const cartItem = await Cart.create({
      userId,
      productId,
      name,
      price,
      image,
      quantity: 1
    });

    res.status(201).json({
      message: "Item added to cart",
      cartItem
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Get all cart items
const getCartItems = async (req, res) => {

  try {

    const cartItems = await Cart.find({
      userId: req.params.userId
    });

    res.status(200).json(cartItems);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Update quantity
const updateCartQuantity = async (req, res) => {

  try {

    const { quantity } = req.body;

    const updatedItem =
      await Cart.findByIdAndUpdate(

        req.params.id,

        { quantity },

        { new: true }
      );

    res.status(200).json(updatedItem);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Remove item
const removeCartItem = async (req, res) => {

  try {

    await Cart.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Item removed"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Clear cart
const clearCart = async (req, res) => {

  try {

    await Cart.deleteMany({
      userId: req.params.userId
    });

    res.status(200).json({
      message: "Cart cleared"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartQuantity,
  removeCartItem,
  clearCart
};