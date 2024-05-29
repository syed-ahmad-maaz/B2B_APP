var express = require("express");
var router = express.Router();
const RetailerController = require("../Controllers/Retailer");
const authenticateBooker = require("../Middleware/UserAuth");

router.route("/").post(authenticateBooker, RetailerController.addRetailer);
router.route("/sendEmail").post(RetailerController.sendEmail);
router.route("/view").get(authenticateBooker, RetailerController.viewRetailer);
// router.route("/Login").post(RetailerController.retailerLogin);
// router.route("/").get(authenticateRetailer, RetailerController.getRetailer);
// router.route("/changePassword").post(RetailerController.changePassword);
router.route("/verifyPhone").post(RetailerController.verifyPhone);
router
  .route("/sendRegistrationEmail")
  .post(RetailerController.sendRegistrationEmail);
module.exports = router;
