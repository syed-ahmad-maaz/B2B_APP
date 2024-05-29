var express = require("express");
var router = express.Router();
const DispatchController = require("../Controllers/Dispatch");
const AuthenticateDispatch = require("../Middleware/UserAuth");

router.route("/").post(DispatchController.PostDispatch);
router.route("/Login").post(DispatchController.LoginDispatch);
router.route("/sendEmail").post(DispatchController.sendEmail);
router.route("/changePassword").post(DispatchController.changePassword);

module.exports = router;
