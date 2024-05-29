const Order = require("../Models/Order");

exports.GetAllOrderList = async (req, res, next) => {
  Order.find()
    .populate([
      { path: "UserId", select: ["FirstName", "LastName"] },
      { path: "OfferId", select: "description"},
    ])
    // .populate([{ path: "OfferId", select: ["description"] }])
    .then((result) => {
      res.status(200).json({
        Orderdata: result,
      });
    })
    .catch((err) => {
      res.status(500);
    });
};

exports.UpdateOrders = (req, res, next) => {
  Order.updateOne(
    { _id: req.params.id },
    {
      $set: {
        OrderStatus: req.body.OrderStatus,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.postOrder = async (req, res, next) => {
  const OrderTotal = req.body.OrderTotal;
  const ProductId = req.body.ProductId;
  const OrderStatus = req.body.OrderStatus;
  const Order_Quantity = req.body.Order_Quantity;
  const OfferId = req.body.OfferId;
  let order = new Order({
    OrderTotal: OrderTotal,
    ProductId: ProductId,
    OrderStatus: OrderStatus,
    Order_Quantity: Order_Quantity,
    UserId: req.userId,
    OfferId: OfferId,
  });
  await order.save();
  console.log(order);
  console.log("order posted");
  res.send(order);
};

exports.getOrder = async (req, res, next) => {
  const loginid = req.userId;
  Order.find({ UserId: loginid })
    .populate("UserId")
    .populate("ProductId.Object")
    .then((result) => {
      res.status(200).json({
        orderData: result,
      });
    })
    .catch((err) => {
      res.status(500);
    });
};

exports.updateOrder = (req, res, next) => {
  Order.updateOne(
    { _id: req.params.id },
    { $set: { OrderStatus: req.body.OrderStatus } }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.getOrderbyDate = (req, res, next) => {
  Order.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        TotalOrders: { $sum: 1 },
      },
    },
  ])
    .then((result) => {
      res.status(200).json({
        orderData: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.getOrderbyCategory = (req, res, next) => {
  Order.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "ProductId.productname",
        foreignField: "name",
        as: "ProductId.product",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "ProductId.product.CategoryId",
        foreignField: "_id",
        as: "categoryData",
      },
    },
    { $unwind: { path: "$categoryData" } },
    {
      $group: {
        _id: "$categoryData.category_name",
        TotalOrders: { $sum: 1 },
      },
    },
  ])
    .then((result) => {
      res.status(200).json({
        orderData: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.getOrderbyRegion = (req, res, next) => {
  Order.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "UserId",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $lookup: {
        from: "regions",
        localField: "users.RegionId",
        foreignField: "_id",
        as: "regions",
      },
    },
    {
      $group: {
        _id: "$regions",
        TotalOrders: { $sum: 1 },
      },
    },
  ])
    .then((result) => {
      res.status(200).json({
        orderData: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.getOrderbyRetailer = (req, res, next) => {
  Order.aggregate([
    {
      $group: {
        _id: "$UserId",
        TotalOrders: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $unwind: "$users",
    },
  ])
    .then((result) => {
      res.status(200).json({
        orderData: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.assigndispatch = (req, res) => {
  Order.updateOne(
    { _id: req.params.id },
    { $set: { DispatcherId: req.body.DispatcherId } }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};