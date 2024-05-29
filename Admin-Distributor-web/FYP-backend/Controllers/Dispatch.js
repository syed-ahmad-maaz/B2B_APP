const Dispatch = require("../Models/Dispatch");
var bcrypt = require("bcryptjs");
const Order = require("../Models/Order");

exports.PostDispatch = async (req, resp, next) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  const Phone_no = req.body.Phone_no;
  const hashedpassword = req.body.password;
  const hash = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(hashedpassword, hash);
  const DistributorId = req.body.DistributorId;
  const AdminId = req.AdminId;
  const dispatchcreate = new Dispatch({
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    Phone_no: Phone_no,
    password: password,
    DistributorId: DistributorId,
    AdminId: AdminId,
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

exports.listofdispatchers = async (req, res, next) => {
  Dispatch.find()
    .populate("AdminId", "name")
    .then((result) => {
      res.status(200).json({
        dispatcherdata: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.UpdateDispatch =
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
  exports.deleteDispatch = async (req, res) => {
    try {
      const dispatchdelete = await Dispatch.findByIdAndDelete(req.params.id);
      if (!req.params.id) {
        return res.status(400).send();
      }
      res.send(dispatchdelete);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  