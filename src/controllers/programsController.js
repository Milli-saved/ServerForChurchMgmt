const mongoose = require("mongoose");
const asycnHandler = require("express-async-handler");
const Program = require("../models/programsModel");
const Member = mongoose.model("Member");

// Add New Programs
const addNewProgram = asycnHandler(async (req, res) => {
  let program = await Program.create(req.body);
  if (program) {
    res.status(200).json(program);
  }
});

// Update Programs
const updateProgram = asycnHandler(async (req, res) => {
  let program = await Program.findById(req.params.id);
  if (!program) {
    res.status(400);
    throw new Error("No program found with this id.");
  }
  const updatedProgram = await Program.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProgram);
});

// Delete Program
const deleteProgram = asycnHandler(async (req, res) => {
  let program = await Program.findById(req.params.id);
  if (!program) {
    res.status(400);
    throw new Error("No program found with this id.");
  }
  await Program.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Program is deleted." });
});

// Get All Programs
const getAllPrograms = asycnHandler(async (req, res) => {
  const program = await Program.find({}).populate("department");
  if (program) {
    res.status(200).json(program);
  }
});

// Get One Program
const getOneProgram = asycnHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (program) {
    res.status(200).json(program);
  }
});

// count and register attended members
const attendedMembers = asycnHandler(async (req, res) => {
  let program = await Program.findById(req.params.id);
  if (!program) {
    res.status(400);
    throw new Error("No program is found with this ID.");
  }
  let count = program.numberOfAttendedMembers;
  let newNumberofAttendedMembers = count + 1;
  let member = await Member.findById(req.body.memberId);
  await Program.findByIdAndUpdate(req.params.id, {
    $push: {
      attendedMembers: {
        memberId: member._id,
        memberName: member.userName,
        memberArrivedAt: Date(),
      },
    },
    numberOfAttendedMembers: newNumberofAttendedMembers,
  });
  res.status(200).json({ ms: "Attendance accepted." });
});

// registering attended members
const getAttendedMembers = asycnHandler(async (req, res) => {
  let program = await Program.findById(req.params.id);
  if (!program) {
    res.status(400);
    throw new Error("No program is found with this ID.");
  }
  res.status(200).json(program.attendedMembers);
});

const leaveRequest = asycnHandler(async (req, res) => {
  let program = await Program.findById(req.params.id);
  if (!program) {
    res.status(400);
    throw new Error("No program is found with this ID.");
  }

  let member = await Member.findById(req.body.memberId);
  await Program.findByIdAndUpdate(req.params.id, {
    $push: {
      absentMembers: {
        memberId: member._id,
        memberName: member.userName,
        reason: req.body.reason,
      },
    },
  });
  res.status(200).json({ ms: "Absent leave requested." });
});

const absentMembersbyLeaveReq = asycnHandler(async (req, res) => {
  let program = await Program.findById(req.params.id);
  if (!program) {
    res.status(400);
    throw new Error("No program is found with this ID.");
  }
  res.status(200).json(program.absentMembers);
});
module.exports = {
  addNewProgram,
  updateProgram,
  deleteProgram,
  getOneProgram,
  getAllPrograms,
  attendedMembers,
  getAttendedMembers,
  leaveRequest,
  absentMembersbyLeaveReq,
};
