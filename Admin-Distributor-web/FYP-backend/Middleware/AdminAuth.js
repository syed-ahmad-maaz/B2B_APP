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
    decodedToken = jwt.verify(token,process.env.ADMIN_SECRET_KEY,(err,res)=>
    {
      if(err)
      {
        return "Token Expired"
      }
      return res;
    });
    console.log("Admin matched Successfully");
    console.log(decodedToken);
    if(decodedToken=="Token Expired")
    {
      return res.send({status:"error", data:"Token Expired"});
    }
  
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
  req.AdminId = decodedToken.AdminId;
  // console.log(req.AdminId);
  
  
  next();
};
