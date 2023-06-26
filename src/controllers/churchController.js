const asyncHandler = require("express-async-handler");
const Church = require("../models/churchModle");

// Add New Church
const addNewChurch = asyncHandler(async (req, res) => {
  let church = await Church.create(req.body);
  if (church) {
    res.status(200).json(church);
  }
});

// Update church
const updateChurch = asyncHandler(async (req, res) => {
  const church = await Church.findById(req.params.id);
  if (!church) {
    res.status(400);
    throw new Error("No church is found with the given id.");
  }
  const updatedChurch = await Church.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedChurch);
});

// Delete Church
const deleteChurch = asyncHandler(async (req, res) => {
  const church = await Church.findById(req.params.id);
  if (!church) {
    res.status(400);
    throw new Error("No churhc is found with the given id.");
  }
  await Church.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Church is deleted." });
});

// Get all churches
const getChurchs = asyncHandler(async (req, res) => {
  const church = await Church.find({}).populate("leadPastor");
  if (church) {
    res.status(200).json(church);
  }
});

// Get One Church using id
const getOneChurch = asyncHandler(async (req, res) => {
  const church = await Church.findById(req.params.id);
  if (church) {
    res.status(200).json(church);
  }
});
module.exports = {
  addNewChurch,
  updateChurch,
  deleteChurch,
  getChurchs,
  getOneChurch,
};
