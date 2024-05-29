var express = require("express");
var router = express.Router();
// const AuthenticateAdmin = require("../Middleware/AdminAuth");
const BookerController = require("../Controllers/Booker");

router.route("/").post(BookerController.PostBooker);
module.exports = router;
