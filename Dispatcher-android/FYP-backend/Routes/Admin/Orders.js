var express = require("express");
var router = express.Router();
const OrdersController = require("../../Controllers/Order");

// router.route("/").get(OrdersController.getOrderbyCategory);
// router.route("/").get(OrdersController.getOrderbyRegion);
// router.route("/").get(OrdersController.getOrderbyDate);
// router.route("/").get(OrdersController.getOrderbyRetailer);
// router.route("/").get(OrdersController.GetAllOrderList);
router.route("/dispatch/:id").put(OrdersController.AssignDispatch);
router.route("/:id").put(OrdersController.UpdateOrders);

module.exports = router;
