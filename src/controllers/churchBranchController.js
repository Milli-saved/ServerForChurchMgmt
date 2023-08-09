const asyncHandler = require("express-async-handler");
const ChurchBranch = require("../models/churchBranchModel");

// Add New Church
const addNewChurchBranch = asyncHandler(async (req, res) => {
  req.body.approvalStatus = false;

  let church = await ChurchBranch.create(req.body);
  if (church) {
    res.status(200).json(church);
  }
});

// Update church
const updateChurchBranch = asyncHandler(async (req, res) => {
  const church = await ChurchBranch.findById(req.params.id);
  if (!church) {
    res.status(400);
    throw new Error("No church is found with the given id.");
  }
  const updatedChurch = await ChurchBranch.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedChurch);
});

// Delete Church
const deleteChurchBranch = asyncHandler(async (req, res) => {
  const church = await ChurchBranch.findById(req.params.id);
  if (!church) {
    res.status(400);
    throw new Error("No churhc is found with the given id.");
  }
  await ChurchBranch.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Church is deleted." });
});

// Get all churches
const getBranchesOfChurch = asyncHandler(async (req, res) => {
  const { churchId } = req.body;
  const church = await ChurchBranch.find({ church: churchId });
  if (church) {
    res.status(200).json(church);
  }
});

// Get One Church using id
const getOneChurchBranch = asyncHandler(async (req, res) => {
  const church = await ChurchBranch.find({ church: req.params.id }).populate(
    "churchBranchLeadPastor"
  );
  console.log("churchs are these: ", church);
  if (church) {
    res.status(200).json(church);
  }
});
module.exports = {
  addNewChurchBranch,
  updateChurchBranch,
  deleteChurchBranch,
  getBranchesOfChurch,
  getOneChurchBranch,
};
