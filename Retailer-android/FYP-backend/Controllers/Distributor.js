const Distributor = require("../Models/Distributor");
var bcrypt = require("bcryptjs");

exports.PostDistributor = async (req, resp, next) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  const hashedpassword = req.body.password;
  const hash = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(hashedpassword, hash);
  const distributorcreate = new Distributor({
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    password: password,
  });
  distributorcreate
    .save()
    .then(() => {
      console.log("Distributor created Successfully  ");
    })
    .catch((err) => {
      console.log("Distributor not Created");
      console.log(err);
    });
};
