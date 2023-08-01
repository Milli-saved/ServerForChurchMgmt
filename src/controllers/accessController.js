const asyncHandler = require("express-async-handler");
const Access = require("../models/accessToUsers");

const addNewAccess = asyncHandler(async (req, res) => {
  let newAccess = await Access.create(req.body);
  if (newAccess) {
    res.status(200).json({
      msg: "New Access added to user.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

const getAllAccess = asyncHandler(async (req, res) => {
  const access = await Access.find({ member: req.params.id });
  res.status(200).json(access);
});

const updateAccess = asyncHandler(async (req, res) => {
  let access = await Access.find({ member: req.body.data.memberId });
  if (access) {
    let updatedAccess = await Access.findByIdAndUpdate(access._id, req.body, {
      new: true,
    });
    res.status(200).json(updatedAccess);
  } else {
    addNewAccess(data);
  }
});

module.exports = {
  addNewAccess,
  updateAccess,
  getAllAccess,
};
