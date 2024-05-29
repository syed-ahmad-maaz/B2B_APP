var express = require("express");
var router = express.Router();
const DistributorController = require("../Controllers/Distributor");
const AuthenticateAdmin = require("../Middleware/AdminAuth");
const AuthenticateDistributor=require("../Middleware/DistributorAuth")

router.route("/signup").post(AuthenticateAdmin,DistributorController.PostDistributor);
router.route("/login").post(DistributorController.DistributorLogin);
router.route("/GetAllList").get(DistributorController.GetAllDistributorList);
router.route("/retailer").get(AuthenticateDistributor,DistributorController.viewRetailer);
router.route("/retailer/orders").get(AuthenticateDistributor,DistributorController.viewOrder);
router.route("/dispatch").post(AuthenticateDistributor,DistributorController.PostDispatcher);
router.route("/listdispatch").get(AuthenticateDistributor,DistributorController.listofdispatchers);
router.route("/:id").put(AuthenticateDistributor,DistributorController.updatedispatch);
router.route("/listofretailers").get(DistributorController.RegisteredRetailerList);
router.route("/api/distributors/:id/block").put(DistributorController.BlockDistributor);
router.route("/api/distributors/:id/unblock").put(DistributorController.UnblockDistributor);




module.exports = router;
