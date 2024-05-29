const Dispatch = require("../Models/Dispatch");
var bcrypt = require("bcryptjs");

exports.PostDispatch = async (req, resp, next) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Phone_no = req.body.Phone_no;
  const hashedpassword = req.body.password;
  const hash = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(hashedpassword, hash);
  const dispatchcreate = new Dispatch({
    FirstName: FirstName,
    LastName: LastName,
    Phone_no: Phone_no,
    password: password,
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
