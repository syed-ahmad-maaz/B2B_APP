const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
   
    const error = new Error("Not authenticatedd.");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token,process.env.ADMIN_SECRET_KEY);
    console.log("Distibutor matched Successfully");
    console.log(decodedToken);
  } catch (err) {
    err.statusCode = 500;
    console.log("JWT EXPIREDDD...........");
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  req.DistributorId = decodedToken.DistributorId;
  console.log("Fromm middlewareeeee",req.DistributorId);
  
  
  next();
};
