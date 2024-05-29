var express = require("express");
var router = express.Router();
const RetailerController = require("../Controllers/Retailer");
const authenticateRetailer = require("../Middleware/UserAuth");

router.route("/").post(RetailerController.addRetailer);
router.route("/sendEmail").post(RetailerController.sendEmail);
router.route("/Login").post(RetailerController.retailerLogin);
router.route("/").get(authenticateRetailer, RetailerController.getRetailer);
router.route("/changePassword").post(RetailerController.changePassword);
router.route("/verifyPhone").post(RetailerController.verifyPhone);
router
  .route("/sendRegistrationEmail")
  .post(RetailerController.sendRegistrationEmail);
module.exports = router;
