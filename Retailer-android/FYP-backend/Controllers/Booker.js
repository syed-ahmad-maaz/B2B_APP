const Booker = require("../Models/Booker");
var bcrypt = require("bcryptjs");
exports.PostBooker = async (req, resp, next) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Phone_no = req.body.Phone_no;
  const hashedpassword = req.body.password;
  const hash = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(hashedpassword, hash);
  const bookercreate = new Booker({
    FirstName: FirstName,
    LastName: LastName,
    Phone_no: Phone_no,
    password: password,
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
