const mongoose = require("mongoose");
const asycnHandler = require("express-async-handler");
const Program = require("../models/programsModel");
const Member = mongoose.model("Member");

const addNewProgram = asycnHandler(async (req, res) => {
  let program = await Program.create(req.body);
  if (program) {
    res.status(200).json(program);
  }
});

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

const deleteProgram = asycnHandler(async (req, res) => {
  let program = await Program.findById(req.params.id);
  if (!program) {
    res.status(400);
    throw new Error("No program found with this id.");
  }
  await Program.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Program is deleted." });
});

const getAllPrograms = asycnHandler(async (req, res) => {
  const program = await Program.find({});
  if (program) {
    res.status(200).json(program);
  }
});
const getOneProgram = asycnHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (program) {
    res.status(200).json(program);
  }
});

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
      attendedMembers: { memberName: member.userName, memberArrivedAt: Date() },
    },
    numberOfAttendedMembers: newNumberofAttendedMembers,
  });
  res.status(200).json({ ms: "Attendance accepted." });
});

const getAttendedMembers = asycnHandler(async (req, res) => {
  let program = await Program.findById(req.params.id);
  if (!program) {
    res.status(400);
    throw new Error("No program is found with this ID.");
  }
  res.status(200).json(program.attendedMembers);
});

module.exports = {
  addNewProgram,
  updateProgram,
  deleteProgram,
  getOneProgram,
  getAllPrograms,
  attendedMembers,
  getAttendedMembers,
};
