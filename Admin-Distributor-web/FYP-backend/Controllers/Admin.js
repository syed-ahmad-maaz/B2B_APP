const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const Admin = require("../Models/Admin");
const Otp=require("../Models/Otp");
const jwt = require("jsonwebtoken");
exports.GetAdminInfo =
  (
  async (req, res, next) => {
    Admin.find()
      .then((result) => {
        res.status(200).json({
          admindata: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });

exports.AdminLogin = (async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const admin = await Admin.findOne({ email: email });
  if (!admin) {
    console.log("NAME NOT FOUND OR PASSWORD NOT MATCHED ");
    res.send("not found");
    return;
  }
  let loadeduser;
  const ismatch = await bcrypt.compare(password, admin.password);
  if (ismatch) {
    loadeduser=admin;
 
    console.log("LOGGED IN SUCCESSFULLY ");
    console.log("JSON WEB-TOKEN OF ADMIN IS :");
    const token = await jwt.sign(
      { AdminId: loadeduser._id.toString() },
       process.env.ADMIN_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRY_TIME }
       );
      
    console.log("Id of admin is :",loadeduser._id.toString() );
    console.log(token);
  

    res.send({ token: token ,
      AdminId: loadeduser._id.toString()});
   
  } else {
    console.log("Email NOT FOUND OR PASSWORD NOT MATCHED ");
    // res.send("Not found");
    return res.status(400).json({ error: "Email already exit" });
  }
});

//otp 
exports.sendEmail = async (req, res) => {
  const Email = req.body.email;
  console.log(Email);
  let data = await Admin.findOne({ Email: Email });
  if (data) {
    console.log("asdd");
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      Email: req.body.email,
      Code: otpcode,
      ExpiresIn: new Date().getTime() + 360 * 1000,
    });
    let otpResponse = await otpData.save();
    mailer(Email, otpcode);
    res.send({ Email });
    res.send();
    // res.status(200).json(200);
  } else {
    res.send("Failed");
    // res.status(200).json(200);
  }
};

exports.changePassword = async (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  const hashedpassword = req.body.password;
  const hash = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(hashedpassword, hash);
  let data = await Otp.find({ Email: req.body.email, Code: req.body.Code });
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.ExpiresIn - currentTime;
    if (diff < 0) {
      res.send("Token Expired");
    } else {
      let user = await Admin.findOne({ Email: req.body.Email });
      user.password =password ;
      user.save();
      res.send("Success")
    }
  } else {
    res.send("Invalid OTP");
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