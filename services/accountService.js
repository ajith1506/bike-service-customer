const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const AccountController = require("../controller/accountController");

router.get("/findAll", checkAuth.verifyToken, AccountController.getAllCustomer);

router.patch("/updateProfile/:custId", AccountController.findCustById);

router.get(
  "/findCustById",
  [checkAuth.verifyToken, checkAuth.isCustomer],
  AccountController.updateprofile
);

router.delete(
  "/deleteAccount/:custId",
  [checkAuth.verifyToken, checkAuth.isCustomer],
  AccountController.deleteCustomer
);

module.exports = router;
