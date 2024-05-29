var express = require("express");
var router = express.Router();
const AuthenticateRetailer = require("../../Middleware/UserAuth");
const AuthenticateDispatch = require("../../Middleware/UserAuth");
const OrdersController = require("../../Controllers/Order");

router.route("/").get(AuthenticateRetailer, OrdersController.getOrder);
router
  .route("/dispatch")
  .get(AuthenticateDispatch, OrdersController.DispatchOrder);
router.route("/").post(AuthenticateRetailer, OrdersController.postOrder);
router.route("/:id").put(AuthenticateRetailer, OrdersController.updateOrder);
router
  .route("/dispatch/:id")
  .put(AuthenticateDispatch, OrdersController.UpdatedispatchOrder);

router
  .route("/dispatch/history")
  .get(AuthenticateDispatch, OrdersController.getCompletedOrder);

module.exports = router;
