const jwt =  require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req , res , next) => {
  try{
    let token;
    // check if authorization header is present/exists 
    if(
      req.headers.authorization && 
      req.headers.authorization.startsWith("Bearer")
    ){
      // Get token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token , process.env.JWT_SECRET);

      // Find user by ID (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    }else{
      return res.status(401).json({
        success : false,
        message : "Not authorized , token missing",
      });
    }

  }catch(error){
    res.status(401).json({
      success : false,
      message : "Invalid token", 
    });
  }
};


module.exports = protect;