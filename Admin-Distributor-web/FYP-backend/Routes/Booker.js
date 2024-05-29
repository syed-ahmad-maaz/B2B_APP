var express = require("express");
var router = express.Router();
const BookerController = require("../Controllers/Booker");
const AuthenticateAdmin = require("../Middleware/AdminAuth");

router.route("/signup").post(AuthenticateAdmin,BookerController.PostBooker);
router.route("/GetAllList").get(BookerController.GetAllBookerList);


module.exports = router;
