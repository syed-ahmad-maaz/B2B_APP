const Booker = require("../Models/Booker");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    res.status(400).json({ message: "Not found" });
  }
};

exports.sendEmail = async (req, res) => {
  const Email = req.body.Email;
  console.log(Email);
  let data = await Booker.findOne({ Email: Email });
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      Email: req.body.Email,
      Code: otpcode,
      ExpiresIn: new Date().getTime() + 360 * 1000,
    });
    let otpResponse = await otpData.save();
    mailer(Email, otpcode);
    res.status(200).send({ message: "Email Found" });
    // res.status(200).json(200);
  } else {
    res.status(400).send({ message: "Not Found" });
    // res.status(200).json(200);
  }
};

exports.changePassword = async (req, res) => {
  console.log(req.body.Email);
  const hashedpassword = req.body.Password;
  const hash = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(hashedpassword, hash);
  let data = await Otp.findOne({ Code: req.body.Code });
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.ExpiresIn - currentTime;
    if (diff < 0) {
      res.status(400).send({ message: "TOKEN EXPIRED" });
    } else {
      let user = await Booker.findOne({ Email: req.body.Email });
      user.password = password;
      user.save();
    }
  } else {
    console.log("sad");
    res.status(400).json({ message: "wrong otp" });
  }
};
const mailer = (Email, otpcode) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "syedahmadmaaz@gmail.com",
      pass: "buqxwuqvbvzuwmzk",
    },
  });
  var mailOptions = {
    from: "syedahmadmaaz@gmail.com",
    to: Email,
    subject: "Password Recovery",
    text: `Your otp to recover password is ${otpcode}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent " + info.response);
    }
  });
};
