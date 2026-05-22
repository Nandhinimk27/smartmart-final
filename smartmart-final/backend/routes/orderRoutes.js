const express = require("express");
const orderController = require("../controllers/orderController");

console.log("ORDER CONTROLLER:", orderController);

const router = express.Router();

router.post("/", orderController.placeOrder);

router.get("/", orderController.getAllOrders);

router.get("/user/:userId", orderController.getUserOrders);

router.put("/:id", orderController.updateOrderStatus);

module.exports = router;