var express= require('express');
var router= express.Router();
const OrdersController = require("../../Controllers/Order");

router.route('/').get(OrdersController.GetAllOrderList)
router.route('/getorderbydate').get(OrdersController.getOrderbyDate)
router.route('/getorderbycategory').get(OrdersController.getOrderbyCategory)
router.route('/getorderbyregion').get(OrdersController.getOrderbyRegion)
router.route('/getorderbyretailer').get(OrdersController.getOrderbyRetailer)
router.route('/:id').put(OrdersController.UpdateOrders)
router.route("/assign/:id").put(OrdersController.assigndispatch);
module.exports = router;
