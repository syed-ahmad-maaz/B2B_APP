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
  const AdminId = req.body.AdminId;
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

exports.LoginBooker = async (req, res) => {
  const Email = req.body.Email;
  const password = req.body.password;
  let loadedUser;
  const user = await Booker.findOne({ Email: Email });
  if (!user) {
    console.log("Email Not Found or Password Not Matched");
    res.status(400).json({ message: "Not found" });
    return;
  }
  loadedUser = user;
  const ismatch = await bcrypt.compare(password, user.password);
  if (ismatch) {
    console.log("LOGGED IN SUCCESSFULLY ");
    console.log("JSON WEB-TOKEN OF Booker is :");
    const token = jwt.sign(
      {
        Email: loadedUser.Email,
        userId: loadedUser._id.toString(),
      },
      "SAM",
      { expiresIn: "24h" }
    );
    console.log(token);

    res.send({ token: token, userId: loadedUser._id.toString() });
  } else {
    console.log("Name NOT FOUND OR PASSWORD NOT MATCHED ");
    res.send("Not found");
  }
};
