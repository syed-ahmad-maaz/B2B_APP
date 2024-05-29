const Distributor = require("../Models/Distributor");
const Dispatch = require("../Models/Dispatch");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/Retailer");
const Order = require("../Models/Order");

exports.PostDistributor = async (req, resp, next) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  const hashedpassword = req.body.password;
  const hash = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(hashedpassword, hash);
  const UserId = req.body.UserId;
  const RegionId = req.body.RegionId;
  const AdminId = req.AdminId;
  console.log(req.body);
  console.log(req.AdminId);
  // const AdminId = req.body.AdminId;
  const distributorcreate = new Distributor({
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    password: password,
    UserId: UserId,
    RegionId: RegionId,
    AdminId: AdminId,
  });
  distributorcreate
    .save()
    .then(() => {
      console.log("Distributor created Successfully  ");
      resp.send("Distributor Createddd");
    })
    .catch((err) => {
      console.log("Distributor not Created");
      console.log(err);
    });
};

exports.DistributorLogin = async (req, res, next) => {
  const email = req.body.Email;
  const password = req.body.Password;

  const distributor = await Distributor.findOne({
    Email: email,
    Password: password,
  });

  if (!distributor) {
    console.log("NAME NOT FOUND OR PASSWORD NOT MATCHED");
    return res.status(404).json({ error: "Distributor not found" });
  }

  if (distributor.blocked) {
    console.log("DISTRIBUTOR IS BLOCKED");
    return res.status(401).json({ error: "Distributor is blocked" });
  }

  let loadeduser;
  const ismatch = await bcrypt.compare(password, distributor.password);

  if (ismatch) {
    loadeduser = distributor;
    console.log("LOGGED IN SUCCESSFULLY ");
    console.log("JSON WEB-TOKEN OF Distributor IS :");

    const token = await jwt.sign(
      { DistributorId: loadeduser._id.toString() },
      process.env.ADMIN_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRY_TIME }
    );

    console.log("Id of distributor is :", loadeduser._id.toString());
    console.log(token);

    res.send({
      token: token,
      DistributorId: loadeduser._id.toString(),
      FirstName: loadeduser.FirstName,
      LastName: loadeduser.LastName
    });
  } else {
    console.log("Email NOT FOUND OR PASSWORD NOT MATCHED ");
    return res
      .status(401)
      .json({ error: "Email or password is incorrect" });
  }
};


exports.GetAllDistributorList = async (req, res, next) => {
  Distributor.find()
    .populate("AdminId", "name")
    .then((result) => {
      res.status(200).json({
        Distributordata: result,
      });
    })
    .catch((err) => {
      res.status(500);
    });
};

exports.viewRetailer = async (req, res, next) => {
  console.log("he");
  console.log(req.DistributorId);
  const loginid = req.DistributorId;
  Distributor.find({ _id: loginid })
    .populate({ path: "UserId", select: ["FirstName", "LastName", "Phone_no"] })
    .then((result) => {
      res.status(200).json({ userdata: result });
      console.log(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.viewOrder = async (req, res, next) => {
  try {
    const distributorId = req.DistributorId; // retrieve the distributor ID from the authenticated user's session

    // find the distributor with the given ID and retrieve their associated user ID
    const distributor = await Distributor.findById(distributorId);

    // const userId = distributor.UserId;
    const retailerIds = distributor.UserId.map((UserId) => UserId._id);

    // retrieve the order details for the given user ID
    // const orders = await Order.find({userId});
    const orders = await Order.find({
      UserId: distributor.UserId,
      UserId: { $in: retailerIds },
    }).populate({ path: "UserId", select: ["FirstName", "LastName"] });
    // .populate("ProductId.Object")

    res.status(200).json({ orderData: orders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "An error occurred while retrieving the order details.",
      });
  }
};

//creating dispatchh

exports.PostDispatcher = async (req, resp, next) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  const Phone_no = req.body.Phone_no;
  const hashedpassword = req.body.password;
  const hash = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(hashedpassword, hash);
  const DistributorId = req.DistributorId;
  // const AdminId = req.AdminId;
  const dispatchcreate = new Dispatch({
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    Phone_no: Phone_no,
    password: password,
    DistributorId: DistributorId,
    // AdminId: AdminId,
  });
  dispatchcreate
    .save()
    .then((result) => {
      console.log("Dispatcher created Successfully  ");
    })
    .catch((err) => {
      console.log("Dispatcher not Created");
      console.log(err);
    });
};



exports.listofdispatchers= async (req, res, next) => {
  try {
    const dispatchers = await Dispatch.find({ DistributorId: req.DistributorId })
    .populate({ path: "DistributorId", select: ["FirstName", "LastName"] })
    .then((result) => {
      res.status(200).json({
        dispatcherdata: result,
      });
    })
    // res.json(dispatchers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatedispatch =
  (
  (req, res, next) => {
    
    Dispatch.updateOne(
      { _id: req.params.id },
      {
        $set: {
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Email: req.body.Email,
          Phone_no: req.body.Phone_no,
          password :req.body.password,
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
    
  
  
  });

  exports.RegisteredRetailerList =
  (
  async (req, res, next) => {
    User.find()
      .then((result) => {
        res.status(200).json({
          retailerdata: result,
        
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          
        });
      });
  });

  //block distributor for fun 
  exports.BlockDistributor =
  (async (req, res) => {
    const distributorId = req.params.id;
  
    try {
      // Update the distributor's status to blocked in the database
      const updatedDistributor = await Distributor.findByIdAndUpdate(
        distributorId,
        { blocked: true },
        { new: true }
      );
  
      if (!updatedDistributor) {
        return res.status(404).json({ message: "Distributor not found" });
      }
  
      return res.status(200).json({ message: "Distributor blocked successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to block distributor" });
    }
  });
  exports.UnblockDistributor = async (req, res) => {
    const distributorId = req.params.id;
  
    try {
      const updatedDistributor = await Distributor.findByIdAndUpdate(
        distributorId,
        { blocked: false },
        { new: true }
      );
  
      if (!updatedDistributor) {
        return res.status(404).json({ message: "Distributor not found" });
      }
  
      return res.status(200).json({ message: "Distributor unblocked successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to unblock distributor" });
    }
  };
  