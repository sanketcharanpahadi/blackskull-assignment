const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = verifyUser = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log(token, req.headers.authorization);
      const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
      req.id = decodedInfo.id;
      next();
    } else {
      res.status(401);
      throw new Error("User not authorized");
    }
    if (!token) {
      res.status(401);
      throw new Error("Token not found. Login again");
    }
  } catch (error) {
    next(error);
  }
};
