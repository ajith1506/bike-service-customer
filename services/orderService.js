const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const OrderController = require("../controller/ordercontroller");

router.get(
  "/findOrders/:customerId",
  [checkAuth.verifyToken, checkAuth.isCustomer],
  OrderController.findMyOrders
);

module.exports = router;
