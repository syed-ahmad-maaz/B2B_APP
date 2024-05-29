var express = require("express");
var router = express.Router();
const AdminController = require("../Controllers/Admin");

router.route("/login").post(AdminController.AdminLogin);
router.route("/loginInfo").get(AdminController.GetAdminInfo);
router.route("/sendEmail").post(AdminController.sendEmail);
router.route("/changePassword").post(AdminController.changePassword);

module.exports = router;
