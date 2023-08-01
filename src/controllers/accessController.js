const asyncHandler = require("express-async-handler");
const Access = require("../models/accessToUsers");

const addNewAccess = asyncHandler(async (req, res) => {
  console.log("unid", req.body);
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
  if (access) {
    res.status(200).json(access);
  }
});

const updateAccess = asyncHandler(async (req, res) => {
  let access = await Access.find({ member: req.params.id });
  if (access.length > 0) {
    let updatedAccess = await Access.findByIdAndUpdate(
      access[0]._id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedAccess);
  } else {
    addNewAccess(req.body);
  }
});

module.exports = {
  addNewAccess,
  updateAccess,
  getAllAccess,
};
