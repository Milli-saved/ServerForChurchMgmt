const asyncHandler = require("express-async-handler");
const Access = require("../models/accessToUsers");

const addNewAccess = asyncHandler(async (req, res) => {
  let newAccess = Access.create(req.body);
  if (newAccess) {
    res.status(200).json({
      msg: "New Access added to user.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});
