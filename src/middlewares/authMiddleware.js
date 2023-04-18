const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const asycnHandler = require("express-async-handler");
const Member = mongoose.model("Member");

const checkToken = asycnHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, "Marcil");
      member = await Member.findById(decode.id).select("-password");
      req.member = member;

      next();
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
