var express = require("express");
var router = express.Router();
// const AuthenticateAdmin = require("../Middleware/AdminAuth");
const BookerController = require("../Controllers/Booker");

router.route("/").post(BookerController.PostBooker);
router.route("/Login").post(BookerController.LoginBooker);
router.route("/sendEmail").post(BookerController.sendEmail);
router.route("/changePassword").post(BookerController.changePassword);

module.exports = router;
