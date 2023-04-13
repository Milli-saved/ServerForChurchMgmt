const asycnHandler = require("express-async-handler");
const Member = require("../models/membersModel");

const addNewMember = asycnHandler(async (req, res) => {
  let member = await Member.create(req.body);
  if (member) {
    res.status(200).json(member);
  }
});

const updateMemberProfile = asycnHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) {
    res.status(400);
    throw new Error("Can not find the requested member.");
  }
  
  const updateMember = await Member.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateMember);
});

const deleteMember = asycnHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) {
    res.status(400);
    throw new Error("Can not find the requested member.");
  }
  await Member.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Member is deleted." });
});

const getAllMembers = asycnHandler(async (req, res) => {
  const member = await Member.find({});
  if (member) {
    res.status(200).json({
      member,
    });
  }
});

const getOneMember = asycnHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (member) {
    res.status(200).json({ member });
  }
});
module.exports = {
  addNewMember,
  updateMemberProfile,
  deleteMember,
  getAllMembers,
  getOneMember,
};
