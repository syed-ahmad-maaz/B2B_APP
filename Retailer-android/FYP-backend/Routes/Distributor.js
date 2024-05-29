var express = require("express");
var router = express.Router();
// const AuthenticateAdmin = require("../Middleware/AdminAuth");
const DistributorController = require("../Controllers/Distributor");

router.route("/").post(DistributorController.PostDistributor);
module.exports = router;
