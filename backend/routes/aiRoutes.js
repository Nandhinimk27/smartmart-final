const express = require("express");

const {
  getLowStockProducts
} = require("../controllers/aiController");

const router = express.Router();

router.get("/low-stock", getLowStockProducts);

module.exports = router;