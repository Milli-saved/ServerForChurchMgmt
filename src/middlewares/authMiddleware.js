const jwt = require("jsonwebtoken");
const asycnHandler = require("express-async-handler");
const User = require("../models/userModel");

const checkToken = asycnHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, "Marcil");
      user = await User.findById(decode.id).select("-password");
      req.user = user;
      next()
    } catch (err) {
      res.status(401);
      throw new Error("Not Authorized.");
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
});

module.exports = { checkToken };
