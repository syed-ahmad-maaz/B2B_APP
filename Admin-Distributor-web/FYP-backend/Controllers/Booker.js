

const Booker = require("../Models/Booker");
var bcrypt = require("bcryptjs");
exports.PostBooker = async (req, resp, next) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  const Phone_no = req.body.Phone_no;
  const hashedpassword = req.body.password;
  const hash = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(hashedpassword, hash);
  const RegionId = req.body.RegionId;
  const AdminId = req.AdminId;
  const bookercreate = new Booker({
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    Phone_no: Phone_no,
    password: password,
    RegionId: RegionId,
    AdminId: AdminId,
  });
  bookercreate
    .save()
    .then(() => {
      console.log("Booker created Successfully  ");
    })
    .catch((err) => {
      console.log("Booker not Created");
      console.log(err);
    });
};

exports.GetAllBookerList = async (req, res, next) => {
  Booker.find()
    .populate("AdminId", "name")
    .then((result) => {
      res.status(200).json({
        Bookerdata: result,
      });
    })
    .catch((err) => {
      res.status(500);
    });
};

  